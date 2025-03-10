use tauri::Manager;

#[tauri::command]
fn read_netrc() -> Result<String, String> {
    match netrc::Netrc::new() {
        Ok(n) => Ok(n.to_string()),
        Err(_) => Err("Could not find a ~/.netrc file, please ensure you have one".to_string()),
    }
}

pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_notification::init())
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![read_netrc])
        .setup(|app| {
            #[cfg(debug_assertions)]
            {
                let window = app.get_webview_window("main").unwrap();
                window.open_devtools();
            }

            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application")
}

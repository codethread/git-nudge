import {Button} from "@/components/ui/button"
import {
	SheetTrigger,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetDescription,
	SheetFooter,
	SheetClose,
	Sheet,
} from "@/components/ui/sheet"

export function FakeSettings({children}: IChildren) {
	return (
		<Sheet>
			<SheetTrigger asChild>
				{children}
				{/* <Button variant="outline" size="sm"> */}
				{/* 	Fake Settings */}
				{/* </Button> */}
			</SheetTrigger>
			<SheetContent side="bottom">
				<SheetHeader>
					<SheetTitle>Edit profile</SheetTitle>
					<SheetDescription>
						Make changes to your profile here. Click save when you're done.
					</SheetDescription>
				</SheetHeader>
				<div className="grid gap-4 p-4">
					{/* <div className="grid grid-cols-4 items-center gap-4"> */}
					{/* 	<Label htmlFor="name" className="text-right"> */}
					{/* 		Name */}
					{/* 	</Label> */}
					{/* 	<Input id="name" value="Pedro Duarte" className="col-span-3" /> */}
					{/* </div> */}
					{/* <div className="grid grid-cols-4 items-center gap-4"> */}
					{/* 	<Label htmlFor="username" className="text-right"> */}
					{/* 		Username */}
					{/* 	</Label> */}
					{/* 	<Input id="username" value="@peduarte" className="col-span-3" /> */}
					{/* </div> */}
				</div>
				<SheetFooter>
					<SheetClose asChild>
						<Button type="submit">Save changes</Button>
					</SheetClose>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	)
}

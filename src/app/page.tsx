import  {Button}  from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar"
export default function Home() {
  return (

    <main className="min-h-screen flex flex-col items-center justify-center gap-4">
  <Button>Click Me</Button>
  <Avatar>
    <AvatarImage src="https://github.com/shadcn.png" />
    <AvatarFallback>CN</AvatarFallback>
  </Avatar>
</main>

  );
}

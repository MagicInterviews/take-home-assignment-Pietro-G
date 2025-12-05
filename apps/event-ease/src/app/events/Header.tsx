import { Button, Form } from "@event-ease/ui";

export const Header = () => (
  <header
    className="w-full flex justify-between items-center border-b border-black p-4"
  >
    <nav className="flex items-center ">
      <a href="/events">EventEase</a>
    </nav>
    <Form.Root action="/api/auth/signout" method="post">
      <Form.Submit asChild>
        <Button variant="text">
          Sign out
        </Button>
      </Form.Submit>
    </Form.Root>
  </header>
);

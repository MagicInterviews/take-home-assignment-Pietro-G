import { Button, Form, Logo } from "@event-ease/ui";

export const Header = () => (
  <header
    className="w-full flex justify-between items-center bg-white p-4 sm:p-6 border-b border-gray-300"
  >
    <nav className="flex items-center">
      <a href="/events">
        <Logo variant="small" />
      </a>
    </nav>
    <Form.Root action="/api/auth/signout" method="post">
      <Form.Submit asChild>
        <Button variant="text" size="sm" className="text-sm sm:text-base text-primary">
          Sign Out
        </Button>
      </Form.Submit>
    </Form.Root>
  </header>
);

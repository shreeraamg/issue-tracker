"use client";

import { Skeleton } from "@/app/components";
import { Button, Container, Flex, Text } from "@radix-ui/themes";
import classNames from "classnames";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiFillBug } from "react-icons/ai";

const Navbar = () => {
  return (
    <nav className="border-b mb-5 px-5">
      <Container>
        <Flex className="h-14" align="center" justify="between">
          <Flex align="center" gap="3">
            <Link href="/">
              <AiFillBug />
            </Link>
            <NavLinks />
          </Flex>
          <AuthStatus />
        </Flex>
      </Container>
    </nav>
  );
};

const NavLinks = () => {
  const currentPath = usePathname();

  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues/list" },
  ];

  return (
    <ul className="flex gap-x-6">
      {links.map((link) => (
        <li key={link.href}>
          <Link
            className={classNames({
              "text-zinc-900": link.href === currentPath,
              "text-zinc-500": link.href !== currentPath,
              "hover:text-zinc-800 transition-colors": true,
            })}
            href={link.href}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

const AuthStatus = () => {
  const { status, data: session } = useSession();

  if (status === "loading") return <Skeleton width="5rem" height="2rem" />;

  if (status === "unauthenticated")
    return <Button onClick={async () => signIn()}>SignIn</Button>;

  return (
    <Flex align="center" gapX="4">
      <Text>{session!.user!.name!}</Text>
      <Button variant="soft" color="gray" onClick={() => signOut()}>
        Logout
      </Button>
    </Flex>
  );
};

export default Navbar;

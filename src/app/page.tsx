"use server";
import Image from "next/image";
// import { getSession } from "@auth0/nextjs-auth0";

export default async function Home() {
  // const session = await getSession();
  // const user = session?.user;
  // console.log(user);
  return (
    <>
      <div className="flex items-center justify-center pt-10">
        <img
          src="https://static-00.iconduck.com/assets.00/auth0-icon-1832x2048-ewzjrdwk.png"
          width={300}
          height={400}
          alt="auth0 logo"
        />
      </div>
    </>
  );
}

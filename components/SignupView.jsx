"use client";

import Link from "next/link";
import Image from "next/image";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

/** 일반 회원가입 페이지 */
export default function SignupView() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();

  async function handleSignup() {
    try {
      await axios.post(
        "http://localhost:8000/users/signup/",
        {
          username: username,
          email: email,
          password: password,
        },
        {
          headers: {
            "content-type": "application/json",
          },
        }
      );

      router.push("/login");
    } catch (error) {
      console.error(error);
    }

    if (password !== confirmPassword) {
      setErrorMessage("비밀번호가 일치하지 않습니다.");
      return;
    }
  }

  return (
    <>
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/realby_logo.png"
          alt="Realby Logo"
          width={90}
          height={30}
          className="object-contain"
        />
      </Link>
      <section className="col-6 col-12-narrower">
        <form method="post" action={"/"}>
          <div className="row gtr-50">
            <div className="col-12 col-12-mobile">
              <input
                type="text"
                id="username"
                name="username"
                placeholder="유저네임"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
            </div>
            <div className="col-12 col-12-mobile">
              <input
                type="email"
                id="email"
                name="email"
                placeholder="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div className="col-12 col-12-mobile">
              <input
                type="password"
                id="password"
                name="password"
                placeholder="비밀번호"
                autoComplete="new-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            <div className="col-12 col-12-mobile">
              <input
                type="password"
                id="password"
                name="password"
                placeholder="비밀번호 확인"
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
              />
            </div>
            <div className="col-12 col-12-mobile">
              {errorMessage && <p>{errorMessage}</p>}
              <button onClick={handleSignup}>가입하기</button>
            </div>
          </div>
        </form>
      </section>
    </>
  );
}
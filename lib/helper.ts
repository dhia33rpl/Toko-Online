"use server"

import { cookies } from "next/headers"
//function untuk menyimpan cookienya
export async function setCookie(
    label: string,
    value: string
){
    (await cookies()).set(label, value, {
        httpOnly: true,
        maxAge: 60 * 60 * 24
    })
}

export async function getCookie(label: string){
    return (await cookies()).get(label)
}

export async function removeCookie(label: string){
    (await cookies()).delete(label)
}
//function untuk mengubah response message 
export async function parseResponseMessage(
    msg: string | {[key: string]: string | undefined }
){
    return typeof msg === "string" ? msg : Object.values(msg).join(",")
}
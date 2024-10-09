export { default } from "next-auth/middleware";

export const config = { matcher: ["/dashboard/:path*", "/cursos/:path*"] }

//seria para profile, del usuario en donde puede ver todos los Reviews que hizo

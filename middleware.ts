export { default } from "next-auth/middleware"

export const config = {
  matcher: [
    "/trips",
    "/reservations",
    "/proerties",
    "/favorites"
  ]
}
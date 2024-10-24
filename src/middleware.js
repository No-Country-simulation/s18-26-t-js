import { withAuth } from 'next-auth/middleware';
import { getToken } from 'next-auth/jwt';

export default withAuth(
  async function middleware(req) {
    const token = await getToken({ req });

    const isAuth = !!token;

    const isAuthRoute =
      req.nextUrl.pathname === '/auth/login' ||
      req.nextUrl.pathname === '/auth/register';

    // Redirigir al perfil de usuario si está logueado y trata de acceder a login o register
    if (isAuth && isAuthRoute) {
      return Response.redirect(new URL('/profileUser', req.url));
    }

    const isAuthPage =
      req.nextUrl.pathname === '/profileUser' ||
      req.nextUrl.pathname === '/securePage';

    // Redirigir a la página a login si no está logueado
    if (!isAuth && isAuthPage) {
      return Response.redirect(new URL('/auth/login', req.url));
    }

    return null;
  },
  {
    callbacks: {
      async authorized() {
        return true;
      },
    },
  },
);

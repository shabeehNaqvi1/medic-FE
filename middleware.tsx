import { withMiddlewareAuthRequired } from '@auth0/nextjs-auth0/edge';

export default withMiddlewareAuthRequired();

export const config = {
  matcher: ['/profile/:path*', '/create-doctor-profile/:path*', '/doctors/:path*', '/conversations/:path*', '/payment-success/:path*'],
};
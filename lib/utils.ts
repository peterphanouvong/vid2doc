import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Represents the authentication URL parameters received in the request
 */
interface AuthUrlParams {
  /** The requested organization code (e.g., 'org_12345') */
  orgCode: string;
  /** The state parameter used in the OAuth flow */
  state: string;
  /** The client_id query parameter identifying the application */
  clientId: string;
  /** The redirect_uri query parameter specifying where to return after auth */
  redirectUri: string;
}

/**
 * Contains localization information for the page
 */
interface Locale {
  /** Indicates if the content should be rendered right-to-left */
  isRtl: boolean;
  /** The language code for the requested content */
  lang: string;
}

/**
 * Contains routing information for the current request
 */
interface Route {
  /** The requested widget context (e.g., 'register' or 'choose_organization') */
  context: string;
  /** The type of authentication flow ('register' or 'login') */
  flow: "register" | "login";
  /** The current path of the request ('auth', 'account', or '/') */
  path: "auth" | "account" | "/";
}

/**
 * Contains the content and metadata for the page
 */
interface WidgetContent {
  /** The page title displayed in the browser tab */
  page_title: string;
  /** The main heading text for the page */
  heading: string;
  /** The description text for the page */
  description: string;
  /** Alternative text for the company logo */
  logo_alt: string;
}

/**
 * Contains widget-specific data and content
 */
interface Widget {
  /** The content object containing page text and metadata */
  content: WidgetContent;
}

/**
 * The context object containing page state and content
 */
interface KindePageContext {
  /** Widget-specific data and generated content */
  widget: Widget;
}

/**
 * The request object containing information about the current request
 */
interface KindePageRequest {
  /** Parameters extracted from the authorization URL */
  authUrlParams: AuthUrlParams;
  /** Localization settings for the page */
  locale: Locale;
  /** Current route information */
  route: Route;
}

/**
 * The main page event object passed to the page component
 */
export type KindePageEvent = {
  /** Contains page state and content information */
  context: KindePageContext;
  /** Contains information about the current request */
  request: KindePageRequest;
};

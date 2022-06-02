// Some regex patterns for handling form's input validation
export const NAME_PATTERN = new RegExp('\\p{Alphabetic}{2,}', 'gu');
export const ZIPCODE_PATTERN = new RegExp('(^\\d{4}?\\d$|^\\d{4}?\\d-\\d{4}$)', 'gm');
export const DATE_PATTERN = new RegExp('\\d{1,2}\\/\\d{1,2}\\/\\d{1,4}');
export const HAVE_SPECIAL = new RegExp('[^\\p{Z}\\p{L}.,\\d]','u');
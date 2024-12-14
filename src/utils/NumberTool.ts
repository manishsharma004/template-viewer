class NumberTool {
    DEFAULT_FORMAT = "default";
  
    STYLE_NUMBER = 1;
    STYLE_CURRENCY = 2;
    STYLE_PERCENT = 3;
    // NOTE: 3 belongs to a non-public "scientific" style...
    STYLE_INTEGER = 4;
  
    // default: parameter access
    /**
     * This implementation returns the default locale. Subclasses
     * may override this method to provide a different locale. Doing so
     * will affect all formatting methods where no locale is specified
     * in the parameters.
     *
     * @return the default {@link Locale}
     */
    getLocale(): string {
      return "en-US";
    }
  
    /**
     * Return the pattern or style to be used for formatting numbers when none
     * is specified in the parameters. Subclasses may override this to provide
     * a different default format.
     *
     * @return the default format
     */
    getFormat(): string {
      return this.DEFAULT_FORMAT;
    }
  
    /**
     * Converts the specified object to a number and returns
     * a formatted string representing that number in the specified
     * {@link Locale}.
     *
     * @param format the custom or standard pattern to be used
     * @param number the input object to be converted
     * @param locale the {@link Locale} to be used for formatting
     * @return a formatted string representing the specified number or
     * the input object/code if the parameters are invalid
     */
    format(format?: any, number?: any, locale?: string): string {
      const num = Number(number);
      const fmt = this.getNumberFormat(format, locale);
      if (num === null || num === undefined || isNaN(num)) {
        return number;
      }
      return fmt.format(num);
    }

    //
    private getNumberFormat(format?: any, locale?: string): Intl.NumberFormat {
      return new Intl.NumberFormat(locale, { style: format });
    }
  }
const numberTool = new NumberTool();

export default numberTool;
  
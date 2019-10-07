import { Liveset } from 'models/Liveset';

const colorRegex = /^#([0-9a-f]{3}){1,2}$/;
const defaultTheme: { [property: string]: string } = {
  'shade-base': '#000',
  'shade-dark': '#111',
  shade: '#444',
  'shade-light': '#fff',
  'shade-active-on': '#f6c408'
};

class ThemeService {
  htmlTag = document.querySelector('html');

  set(input: Liveset['theme']) {
    console.log(input);
    input = input || defaultTheme;

    Object.keys(input).forEach(prop =>
      this.htmlTag.style.setProperty(`--${prop}`, input[prop])
    );
    this.htmlTag.style.setProperty(
      '--shade-base-overlay',
      `${input['shade-base']}d`
    );
  }

  isValidTheme(input: Liveset['theme']) {
    const errors: string[] = [];
    Object.keys(input).forEach(prop => {
      const value = input[prop];
      if (!defaultTheme[prop]) {
        errors.push(`Theme property '${prop}' is not recognised.`);
      }
      if (!colorRegex.test(value)) {
        errors.push(
          `Theme value for '${prop}' is not a valid RGB color. '${value}' should be in #xyz or #xyyzzx format.`
        );
      }
    });
    if (errors.length) {
      throw new Error(errors.join('\n'));
    }
  }
}

export default new ThemeService();

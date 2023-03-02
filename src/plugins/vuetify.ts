import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import { aliases, mdi } from 'vuetify/iconsets/mdi';
// NOTE: icomoonとmdiを同居させるため、fonts.cssファイルに::before追記(Ln 13)
//  -> [class^="icon-"]::before, [class*=" icon-"]::before {
import '@/assets/css/fonts.css';
import '@mdi/font/css/materialdesignicons.css';

export default createVuetify({
  icons: {
    defaultSet: 'mdi',
    aliases: {
      ...aliases,
      clear: 'icon-close',
    },
    sets: {
      mdi,
    },
  },
});

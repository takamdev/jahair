import { useTranslation } from 'react-i18next';
import '../i18n'; // Assure-toi d'importer la configuration i18n

function Test() {
  const { t, i18n } = useTranslation();

  return (
    <div className='mt-28'>
      <h1>{t('welcome')}</h1>
      <button onClick={() => i18n.changeLanguage('fr')}>Français</button>
      <button onClick={() => i18n.changeLanguage('en')}>English</button>
      <button onClick={() => i18n.changeLanguage('it')}>Italien</button>

    </div>
  );
}

export default Test;

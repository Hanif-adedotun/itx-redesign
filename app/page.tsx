import styles from './page.module.css';
import Header from '@/components/header';
import FooterSection from '@/components/footer';
import HomeSection from '@/components/LandingPage/homeSection';
import NumberSection from '@/components/LandingPage/numberSetion';
import ServicesSection from '@/components/LandingPage/servicesSection';

export default function Home() {
  return (
    <main className={styles.main}>
      <Header/>

      <HomeSection/>

      <NumberSection/>

      <ServicesSection/>

      <FooterSection/>
    </main>
  )
}

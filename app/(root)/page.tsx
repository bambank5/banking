import TotalBalanceBox from '@/components/TotalBalanceBox';
import HeaderBox from '@/components/ui/HeaderBox'
import RightSidebar from '@/components/ui/RightSidebar';
import { getLoggedInUser } from '@/lib/actions/user.action';

const Home = async () => {
  const loggedIn = await getLoggedInUser();

  return (
    <section className='home'>
      <div className='home-content'>
        <header className='home-header'>
          <HeaderBox 
            type="greeting"
            title="Welcome"
            user={loggedIn?.name || "Guest"}
            subtext="Kelola Akun Anda Dan Bertransaksi secara Efisien"
          />

          <TotalBalanceBox 
            account={{}}
            totalBanks={1}
            totalCurrentBalance={12350000}
          />
        </header>
        RECENT TRANSACTION
      </div>

      <RightSidebar 
        user={loggedIn}
        transaction={[]}
        banks={[{ currentBalance: 12000000},{ CurrentBalance: 35000000}]}
      />
    </section>
  )
}

export default Home

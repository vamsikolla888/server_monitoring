import DashboardCard from '@/common/cards/DashboardCard';
import CommonLucideIcon from '@/common/Icons/CommonLucideIcon';
import { useGetAllDetailsQuery } from '@/redux/Apislice';
import { getDataFromLocalStorage } from '@/utils/localStorage';
import ChartOne from '@/common/charts/ChartOne';
import ChartTwo from '@/common/charts/ChartTwo';
import ChartThree from '@/common/charts/ChartThree';

const Dashboard = () => {
  const { data } = useGetAllDetailsQuery('users');
  // console.log(getDataFromLocalStorage("accessToken"))
  const cardData = [
    {
      title: 'Smart TV',
      icon: 'tv-minimal',
      iconClassName: 'text-cyan-600',
      levelUp: true,
      value: 100,
      storageUsed: '8.5 GB',
    },
    {
      title: 'Smart Speaker',
      icon: 'speaker',
      iconClassName: 'text-rose-600',
      levelUp: false,
      value: 34,
      storageUsed: '2.8 GB',
    },
    {
      title: 'Smart Watch',
      icon: 'watch',
      iconClassName: 'text-purple-600',
      levelUp: false,
      value: 19,
      storageUsed: '5GB',
    },
    {
      title: 'Smart Bulb',
      icon: 'lightbulb',
      iconClassName: 'text-amber-400',
      levelUp: true,
      value: 100,
      storageUsed: '1GB',
    },
  ];
  return (
    <div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        {cardData.map(
          ({ icon, iconClassName, levelUp, value, storageUsed, title }) => (
            <DashboardCard
              key={icon}
              value={value}
              levelUp={levelUp}
              title={title}
              storageUsed={storageUsed}
            >
              <CommonLucideIcon name={icon} className={iconClassName} />
            </DashboardCard>
          )
        )}
      </div>
      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <ChartOne />
        <ChartTwo />
        <ChartThree />
        {/* <MapOne /> */}
        {/* <div className="col-span-12 xl:col-span-8">
          <TableOne />
        </div>
        <ChatCard /> */}
      </div>
    </div>
  );
};

export default Dashboard;

type Props = {
  deaneryCount: number;
  parishCount: number;
};

const DeaneryStats = ({ deaneryCount, parishCount }: Props) => (
  <div className="bg-primary-600 px-6 md:px-16 lg:px-24 py-8">
    <div className="max-w-7xl mx-auto flex flex-wrap gap-8 md:gap-16 items-center">
      <div>
        <p className="text-4xl font-bold text-white">{deaneryCount}</p>
        <p className="text-primary-200 text-sm font-medium mt-0.5">Deaneries</p>
      </div>

      <div className="w-px h-10 bg-primary-500 hidden md:block" />

      <div>
        <p className="text-4xl font-bold text-white">{parishCount}</p>
        <p className="text-primary-200 text-sm font-medium mt-0.5">Parishes</p>
      </div>

      <div className="w-px h-10 bg-primary-500 hidden md:block" />

      <div>
        <p className="text-4xl font-bold text-white">1</p>
        <p className="text-primary-200 text-sm font-medium mt-0.5">Diocese</p>
      </div>

      {/* Right side label */}
      <div className="ml-auto hidden lg:block text-right">
        <p className="text-white font-bold text-base">
          Catholic Diocese of Osogbo
        </p>
        <p className="text-primary-200 text-xs mt-0.5">
          Province of Ibadan · Church in Nigeria
        </p>
      </div>
    </div>
  </div>
);

export default DeaneryStats;

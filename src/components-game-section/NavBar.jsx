import ColorModeSwitch from './ColorModeSwitch';
import SearchInput from './SearchInput';

const NavBar = ({ onSearch, currentPage, onPageChange }) => {
  const navItems = [
    { label: 'Home', page: 'home' },
    { label: 'Games', page: 'games' },
    { label: 'Movies', page: 'movies' },
    { label: 'About', page: 'about' }
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#09090d]/95 backdrop-blur-xl border-b border-white/10 shadow-[0_15px_45px_-30px_rgba(0,0,0,0.85)]">
      <div className="main-container flex flex-col gap-4 py-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 text-white text-lg font-bold shadow-lg shadow-orange-500/20">
            VX
          </span>
          <div>
            <h1 className="text-lg font-semibold tracking-[0.2em] uppercase text-white">Vision X Play Hub</h1>
            <p className="text-sm text-slate-400">Movies & games hub</p>
          </div>
        </div>

        <div className="hidden rounded-full bg-white/5 border border-white/10 p-2 md:flex items-center gap-2 shadow-inner shadow-black/20">
          {navItems.map(item => (
            <button
              key={item.page}
              onClick={() => onPageChange(item.page)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${currentPage === item.page ? 'bg-white text-slate-950 shadow-sm' : 'text-slate-300 hover:bg-white/10 hover:text-white'}`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
          {currentPage === 'games' && <div className="w-full sm:w-72"><SearchInput onSearch={onSearch} /></div>}
          <ColorModeSwitch />
        </div>
      </div>

      <div className="md:hidden main-container flex flex-wrap gap-2 pb-4">
        {navItems.map(item => (
          <button
            key={item.page}
            onClick={() => onPageChange(item.page)}
            className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition ${currentPage === item.page ? 'bg-white text-slate-950' : 'bg-white/5 text-slate-300 hover:bg-white/15 hover:text-white'}`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </header>
  );
};

export default NavBar;
import { useTranslate } from '@forgedevstack/lingo/react';
import { SVG_LOGO_MARK, SVG_LOGO_SIZE, SVG_NAV_SIZE } from '@const';
import type { AppShellSidebarProps } from '../../AppShell.types';

export function AppShellSidebar(props: AppShellSidebarProps) {
  const { groups, activeId, onNavigate, footer } = props;
  const t = useTranslate();

  return (
    <aside className="Clm-sidebar">
      <div className="Clm-sidebar-top">
        <div className="Clm-logo">
          <img src={SVG_LOGO_MARK} alt={t('brand')} width={SVG_LOGO_SIZE} height={SVG_LOGO_SIZE} />
          <div>
            <div className="Clm-logo-word">Car<span>Life</span></div>
            <div className="Clm-logo-sub">{t('tagline')}</div>
          </div>
        </div>
      </div>
      <nav className="Clm-nav">
        {groups.map((group) => (
          <div key={group.id}>
            <div className="Clm-nav-group-label">{group.label}</div>
            {group.items.map((item) => {
              const isActive = item.id === activeId;
              return (
                <button
                  key={item.id}
                  type="button"
                  className={isActive ? 'Clm-nav-item Clm-nav-item--active' : 'Clm-nav-item'}
                  onClick={() => onNavigate(item.to)}
                >
                  <img src={item.iconSrc} alt="" width={SVG_NAV_SIZE} height={SVG_NAV_SIZE} />
                  {t(item.labelKey)}
                </button>
              );
            })}
          </div>
        ))}
      </nav>
      <div className="Clm-sidebar-foot">{footer}</div>
    </aside>
  );
}

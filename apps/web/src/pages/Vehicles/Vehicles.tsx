import { useTranslate } from '@forgedevstack/lingo/react';
import { useNavigate } from 'react-router-dom';
import { ONE, ROUTE_ONBOARDING, ROUTE_VEHICLE, SVG_EMPTY_VEHICLE, SVG_NAV_VEHICLES, ZERO } from '@const';
import { ClmButton, ClmEmpty, ClmList, ClmPageHead, ClmPlate, ClmRow } from '@common';
import { useAppState } from '@hooks';

export function Vehicles() {
  const { vehicles, select } = useAppState();
  const t = useTranslate();
  const navigate = useNavigate();

  function openVehicle(id: string) {
    void select(id);
    navigate(ROUTE_VEHICLE);
  }

  return (
    <div className="Bear-Vehicles">
      <ClmPageHead title={t('vehicles')} subtitle={t('pageSubVehicles')} />
      {vehicles.length === ZERO ? (
        <ClmEmpty
          iconSrc={SVG_EMPTY_VEHICLE}
          title={t('noVehicles')}
          body={t('noVehiclesBody')}
          action={<ClmButton onClick={() => navigate(ROUTE_ONBOARDING)}>{t('addVehicle')}</ClmButton>}
        />
      ) : (
        <>
          <ClmList>
            {vehicles.map((vehicle) => (
              <ClmRow
                key={vehicle.id}
                iconSrc={SVG_NAV_VEHICLES}
                title={[vehicle.make, vehicle.model].filter(Boolean).join(' ') || t('unknown')}
                subtitle={<ClmPlate plate={vehicle.formattedRegistrationNumber} compact />}
                action={<ClmButton kind="outline" onClick={() => openVehicle(vehicle.id)}>{t('viewVehicle')}</ClmButton>}
              />
            ))}
          </ClmList>
          {vehicles.length === ONE && (
            <ClmEmpty
              iconSrc={SVG_EMPTY_VEHICLE}
              title={t('oneVehicle')}
              body={t('oneVehicleBody')}
              action={<ClmButton onClick={() => navigate(ROUTE_ONBOARDING)}>{t('addVehicle')}</ClmButton>}
            />
          )}
        </>
      )}
    </div>
  );
}

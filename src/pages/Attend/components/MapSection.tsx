import styled from '@emotion/styled';
import { colors } from '@/styles/colors';
import { Map, MapMarker, Circle, CustomOverlayMap } from 'react-kakao-maps-sdk';
import useKakaoLoader from '@/hooks/useKakaoLoader';
import { RiMapPinUserLine } from 'react-icons/ri';

const MapSection = () => {
  useKakaoLoader();

  return (
    <StyledMap
      center={{
        lat: 35.17898169622223,
        lng: 126.90961034009142,
      }}
      level={2}
    >
      <MapMarker
        position={{
          lat: 35.17898169622223,
          lng: 126.90961034009142,
        }}
      />
      <CustomOverlayMap
        position={{
          lat: 35.17898169622223,
          lng: 126.90911034009142,
        }}
      >
        <UserLocationMarker />
      </CustomOverlayMap>

      <Circle
        center={{
          lat: 35.17898169622223,
          lng: 126.90961034009142,
        }}
        radius={50}
        strokeWeight={1}
        strokeColor={colors.primary}
        strokeOpacity={1}
        fillColor={colors.primary}
        fillOpacity={0.1}
      />
    </StyledMap>
  );
};

const StyledMap = styled(Map)({
  height: '300px',
  width: '100%',
  borderRadius: '8px',
  backgroundColor: colors.gray200,
});

const UserLocationMarker = styled(RiMapPinUserLine)({
  fontSize: '36px',
  color: colors.primaryDark,
});

export default MapSection;

import styled from '@emotion/styled';
import { colors } from '@/styles/colors';
import { Map, MapMarker, Circle, CustomOverlayMap } from 'react-kakao-maps-sdk';
import useKakaoLoader from '@/hooks/useKakaoLoader';
import { RiMapPinUserLine } from 'react-icons/ri';
import mapMarker from '@/assets/MapMarker.svg';
import { useState, useEffect } from 'react';
import haversine from 'haversine-distance';

const ATTENDANCE_RADIUS = 50; // 출석인정 거리

interface MapSectionProps {
  isAttendanceValid: boolean;
  setIsAttendanceValid: (value: boolean) => void;
}

const MapSection = ({ isAttendanceValid, setIsAttendanceValid }: MapSectionProps) => {
  useKakaoLoader();

  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const MeetingLocation = { lat: 35.17898169622223, lng: 126.90961034009142 };

  //사용자 위치
  useEffect(() => {
    if (!navigator.geolocation) {
      setUserLocation(null);
      return;
    }

    const handleSuccess = (position: GeolocationPosition) => {
      setUserLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    };

    const handleError = () => {
      console.log('위치 정보를 가져올 수 없습니다:');
    };

    // 위치를 지속적으로 감지
    const watchId = navigator.geolocation.watchPosition(handleSuccess, handleError, {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0,
    });

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  // 반경 50미터 이내인지 확인
  useEffect(() => {
    if (userLocation) {
      const distance = haversine(userLocation, MeetingLocation);
      if (distance <= ATTENDANCE_RADIUS) {
        setIsAttendanceValid(true);
      }
    }
  }, [userLocation]);

  return (
    <StyledMap center={MeetingLocation} level={2}>
      <MapMarker
        position={MeetingLocation}
        image={{
          src: mapMarker,
          size: { width: 24, height: 35 },
        }}
      />
      {userLocation && (
        <CustomOverlayMap position={userLocation}>
          <UserLocationMarker />
        </CustomOverlayMap>
      )}

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
        fillOpacity={isAttendanceValid ? 0.5 : 0.1}
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

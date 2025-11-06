import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormContext } from 'react-hook-form';
import styled from '@emotion/styled';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { colors } from '@/styles/colors';
import { useHeader } from '@/hooks/useHeader';
import PrimaryButton from '@/components/common/PrimaryButton';
import useKakaoLoader from '@/hooks/useKakaoLoader';

interface LocationData {
  name: string;
  latitude: number;
  longitude: number;
}

const LocationInputPage = () => {
  useHeader({ centerContent: '장소 설정' });
  useKakaoLoader();
  const navigate = useNavigate();
  const { setValue, getValues } = useFormContext();

  const formLoc = getValues('location') as LocationData;
  const [searchText, setSearchText] = useState<string>(formLoc.name);
  const [selectedLocation, setSelectedLocation] = useState<LocationData>(formLoc);
  const [mapCenter, setMapCenter] = useState<{ lat: number; lng: number }>({
    lat: formLoc.latitude,
    lng: formLoc.longitude,
  });

  // 좌표를 주소로 변환
  const getAddressFromCoords = (lat: number, lng: number) => {
    if (!window.kakao) return;

    const geocoder = new window.kakao.maps.services.Geocoder();

    geocoder.coord2Address(lng, lat, (result: any, status: any) => {
      if (status === window.kakao.maps.services.Status.OK) {
        const address = result[0].address.address_name;
        setSelectedLocation({
          name: address,
          latitude: lat,
          longitude: lng,
        });
        setSearchText(address);
      }
    });
  };

  // 텍스트 검색
  const handleSearch = () => {
    if (!searchText.trim() || !window.kakao) return;

    const places = new window.kakao.maps.services.Places();

    places.keywordSearch(searchText, (result: any, status: any) => {
      if (status === window.kakao.maps.services.Status.OK) {
        const place = result[0];
        const lat = parseFloat(place.y);
        const lng = parseFloat(place.x);

        const locationData = {
          name: place.place_name || place.address_name,
          latitude: lat,
          longitude: lng,
        };

        setSelectedLocation(locationData);
        setMapCenter({ lat, lng });
      } else {
        alert('검색 결과를 찾을 수 없습니다.');
      }
    });
  };

  // 지도 클릭 핸들러
  const handleMapClick = (_: any, mouseEvent: any) => {
    const latlng = mouseEvent.latLng;
    const lat = latlng.getLat();
    const lng = latlng.getLng();

    // 좌표를 주소로 변환
    getAddressFromCoords(lat, lng);
    setMapCenter({ lat, lng });
  };

  // 완료 버튼 클릭
  const handleComplete = () => {
    if (selectedLocation) setValue('location', selectedLocation);
    navigate(-1);
  };

  return (
    <PageContainer>
      <SearchSection>
        <SearchInput
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="장소를 검색해주세요"
        />
        <SearchButton onClick={handleSearch}>검색</SearchButton>
      </SearchSection>

      <MapContainer>
        <Map
          center={mapCenter}
          style={{ width: '100%', height: '100%' }}
          level={3}
          onClick={handleMapClick}
        >
          {selectedLocation && (
            <MapMarker
              position={{
                lat: selectedLocation.latitude,
                lng: selectedLocation.longitude,
              }}
            />
          )}
        </Map>
      </MapContainer>

      <PrimaryButton text="완료" onClick={handleComplete} disabled={!selectedLocation} />
    </PageContainer>
  );
};

const PageContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  height: '85vh',
  backgroundColor: colors.white,
});

const SearchSection = styled.div({
  display: 'flex',
  padding: '16px 20px',
  gap: 12,
  borderBottom: `1px solid ${colors.gray200}`,
});

const SearchInput = styled.input({
  flex: 1,
  padding: '12px 16px',
  border: `1px solid ${colors.gray300}`,
  borderRadius: 8,
  fontSize: 16,
  outline: 'none',

  '&:focus': {
    borderColor: colors.primary,
  },
});

const SearchButton = styled.button({
  padding: '12px 20px',
  backgroundColor: colors.primary,
  color: colors.white,
  border: 'none',
  borderRadius: 8,
  fontSize: 16,
  fontWeight: 'bold',
  cursor: 'pointer',

  '&:hover': {
    backgroundColor: colors.primaryDark,
  },
});

const MapContainer = styled.div({
  flex: 1,
  zIndex: 0,
});

export default LocationInputPage;

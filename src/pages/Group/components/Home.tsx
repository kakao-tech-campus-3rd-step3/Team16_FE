import styled from "@emotion/styled";
import TagBadge from "@/components/common/TagBadge";
import { CiCalendarDate } from "react-icons/ci";
import { IoPeopleOutline } from "react-icons/io5";
import {colors} from "@/styles/colors";
import { typography } from "@/styles/typography";



const Home = () => {
    return (
        <Wrapper>
            <ImgWrapper>
                <Img src="https://cdn.crowdpic.net/detail-thumb/thumb_d_69636B02CD65FFFAFF201750D165A09E.png"/>
            </ImgWrapper>
            <BodyWrapper>
                <GroupInfo> 
                    <GroupHeader>
                        <GroupName>그룹 이름</GroupName>
                        <TagBadge tag={"위험"}/>
                    </GroupHeader>
                    <Desc>
                        <CiCalendarDate/>
                        <GroupCreatedDay>2023-10-10일 개설됨</GroupCreatedDay>
                    </Desc> 
                    <Desc>
                        <IoPeopleOutline/>
                        <MemberCount>7명</MemberCount>
                    </Desc>
                </GroupInfo>  
                <GroupDesc>
                    안녕하세요! 저희는 함께 공부하고 성장하는 것을 목표로 하는 그룹입니다. 다양한 주제에 대해 토론하고, 서로의 경험을 공유하며, 함께 프로젝트를 진행합니다. 새로운 아이디어와 도전을 환영하며, 모든 멤버가 적극적으로 참여할 수 있는 환경을 만들고자 합니다. 함께 성장하고 발전하는 여정에 동참해 주세요!
                </GroupDesc>
                <ReviewHeader>이 모임이 받은 리뷰</ReviewHeader>
                {Array.from({ length: 10 }).map((_, idx) => (
                    <Review key={idx}> 동아리의 분위기가 이상해요 </Review>
                ))}
            </BodyWrapper>
        </Wrapper>
    );
  };

  const Wrapper=styled.div({    
  })    

  const ImgWrapper=styled.div({
    width:"100%",
    height:"250px",
  })
  
  const Img=styled.img({
    width:"100%",
    height:"100%",
    objectFit:"cover"
  })

  const BodyWrapper=styled.div({
    margin:"15px",
    gap:"10px",
    display:"flex",
    flexDirection:"column"
  })

  const GroupHeader=styled.div({
    display:"flex",
    alignItems:"center",
    gap:"10px"
  })

  const GroupInfo=styled.div({
    display:"flex",
    flexDirection:"column",
    gap:"10px"
  })

  const GroupName=styled.div({    
    fontSize:"20px",
    fontWeight:"bold"
  })

  const Desc=styled.div({      
    display:"flex",
    alignItems:"center",
    gap:"10px"
  })

  const GroupCreatedDay=styled.div({
    ...typography.small,
    color: colors.gray700,
  });

  const MemberCount=GroupCreatedDay

  const GroupDesc=styled.div({
    ...typography.body,
    background: colors.gray100,
    borderRadius: "8px",
    padding: "10px",
  });

  const ReviewHeader=styled.h1({
    ...typography.h1,
    marginTop:"20px",
    marginBottom:"5px"
  })

  const Review=styled.div({
    ...typography.body,
    borderRadius:"8px",
    padding:"15px",
    background:colors.gray100
  })


  export default Home;
  
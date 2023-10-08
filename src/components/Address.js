import DaumPostcodeEmbed from "react-daum-postcode";

export default function Address(props) {
    const temp = (data)=>{
        console.log(data);
        props.zipcodehandle(data.zonecode);
        //props.addresshandle(data.address);
        let address=data.roadAddress;
        address=address.split(" ");
        props.addresshandle(address);
        props.addresstoggle();
    }
    return (
        <div className="Modal">
            <div className="ModalBody">
                <div className="ModalCloseBtn" onClick={()=>{props.addresstoggle()}} >X</div>
                <div className="Modal-content">
                    <DaumPostcodeEmbed 
                      onComplete={temp}
                      style={{width:"400px", height:"400px"}} />
                </div>
            </div>

        </div>
    )
}
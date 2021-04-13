import React from 'react';
class NewNavBar extends React.Component{
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
      }
    componentDidMount(){
        const mockData = {
            "login":true,
            "items": [
                {label:"Home",link:"/dashboard?pk_campaign=landing&pk_keyword=dashboard"},
                {label:"Search",link:"/search"},{label:"Profile",link:"/profile/526a67ca-8750-55ac-b337-1d417606712d"},
                {label:"Solutions",link:"/solution_landing"},{label:"Quotations",link:"https://www.google.com"},
                {label:"Messages",link:"/messages"},
                {label:"Connections",subItems:[
                    {label:"My Network",link:"/network/526a67ca-8750-55ac-b337-1d417606712d/Xhcompany2"},
                    {label:"My Invitations",link:"/invitations"}
                ]}
            ],
            "moreItems":[
                {label:"Help",link:"https://help.seraitrade.com/knowledge"},
                {label:"Settings",link:"/accountSettings"},{label:"Logout",link:"/iam_logout"}],
            "joinLink":"https://screening-registration.dev.seraitrade.net/",
            "loginLink":"https://api.platform.dev.seraitrade.net/iam/oauth/authorize?client_id=ThreadsWeb&redirect_uri=http://localhost:4003/iamCallback&response_type=token&state=ThreadsWeb"
        };
        const sessionStorageItem = window.sessionStorage.getItem('seraitrade-thread-web-navigator');
        const navigatorModelString = sessionStorageItem ? sessionStorageItem : JSON.stringify(mockData);
        const navigatorModel = JSON.parse(navigatorModelString);


        const pfMobileMenuBar = this.myRef.current;
        pfMobileMenuBar.login = navigatorModel.login;
        pfMobileMenuBar.loginlink = navigatorModel.loginLink;
        pfMobileMenuBar.joinlink = navigatorModel.joinLink;
        pfMobileMenuBar.items = navigatorModel.items;
        pfMobileMenuBar.moreitems = navigatorModel.moreItems;
        pfMobileMenuBar.addEventListener('change',(e)=>{
            console.log(e.detail);
            //Todo: handle navigator change here.
        })
    }
    
    render() {
        return(
         <div>
            <pf-menu-bar
                ref={this.myRef}
            ></pf-menu-bar>
        </div>
        )
    }
}

export default NewNavBar;
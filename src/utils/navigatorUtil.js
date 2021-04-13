
const dashboardMenu = {
    label:'Home',
    link:'/dashboard?pk_campaign=landing&pk_keyword=dashboard'
};
const searchMenu = {
    label:'Search',
    link:'/search'
};
const profileMenu = {
    label:'Profile',
    link:'/profile'
};
const solutionMenu = {
    label:'Solutions',
    link: '/solution_landing'
};

const quotationMenu = {
    label:'Quotations',
    link: 'https://www.google.com'
};

const messageMenu = {
    label:'Messages',
    link:'/messages'
};
const connectionMenu = {
    label:'Connections',
    subItems:[
        
    ]
}

const networkMenu = {
    label:'My Network',
    link:'/network'
}

const invitationMenu = {
    label:'My Invitations',
    link:'/invitations'
}

const invitationMobileMenu = {
    label:'My Invitations',
    link:'/invitations/receiver'
}

const helpMenu = {
    label:'Help',
    link:'https://help.seraitrade.com/knowledge'
}
const settingMenu = {
    label:'Settings',
    link:'/accountSettings'
}
const logoutMenu = {
    label:'Logout',
    link:'/iam_logout'
}


const moreMenus = [helpMenu,settingMenu,logoutMenu];

function generateMenusByPermissions(){
    const _menus = [];
    let loginUserData = storageUtil.getLoginUserIamToken();
    if(loginUserData){
        
        const currentCompanyId = loginUserData.company_id;
        const currentCompanyName = loginUserData.company_name;

        _menus.push(dashboardMenu);


        if (srPermission.couldSearch()) {
            _menus.push(searchMenu)
        }
        profileMenu.link += '/' + currentCompanyId;
        _menus.push(profileMenu);
        if(!mobileDetect.mobileCheck()){
            _menus.push(solutionMenu);
        }
        _menus.push(quotationMenu);
        if (srPermission.couldMessagesView()) {
            _menus.push(messageMenu);
        }
        networkMenu.link += '/' + currentCompanyId + '/' + currentCompanyName;
        connectionMenu.subItems.push(networkMenu);
        if (srPermission.couldInvitationView()) {
            if(mobileDetect.mobileCheck()){
                connectionMenu.subItems.push(invitationMobileMenu);
            }else{
                connectionMenu.subItems.push(invitationMenu);
            }
            
        }
        _menus.push(connectionMenu)
    }
    return _menus; 
}

function getJoinLink(){
    let company = companyUtil.getCurrentCompanyProfile();
    let sourceSuffix='';
    if(company) {
        sourceSuffix='?utm_campaign=public_profile&utm_content=' + company.company_name
    } else {
        console.error('Join Now, can\'t find current profile')
    }
    return process.env.REACT_APP_JOIN_LINK+ sourceSuffix
}

function getLoginLink(){
    console.info("navigateToLogin");
    var iamUrl = process.env.REACT_APP_IAM_URL;
    iamUrl += "?client_id=";
    iamUrl += process.env.REACT_APP_IAM_CLIENT_ID;
    iamUrl += "&redirect_uri=";
    iamUrl += process.env.REACT_APP_IAM_REDIRECT_URI;
    iamUrl += "&response_type=";
    iamUrl += process.env.REACT_APP_IAM_RESPONSE_TYPE;
    iamUrl += "&state=";
    iamUrl += process.env.REACT_APP_IAM_STATE;
    var wantToLogin = storageUtil.getThreadWebWantToLoginUser();
    if (wantToLogin) {
        iamUrl += "&username=";
        iamUrl += encodeURIComponent(wantToLogin);
    }
    console.info("navigate to iam service url=" + iamUrl);
    return iamUrl
}
export default {
    generateMenusByPermissions,
    moreMenus,
    getJoinLink,
    getLoginLink
}
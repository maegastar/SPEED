export const cookieCreator = (cookieName, cookieValue, hoursToExpire) => {
    let date = new Date();
    date.setTime(date.getTime() + hoursToExpire * 60 * 1000);
    document.cookie =
        cookieName + " = " + cookieValue + "; expires = " + date.toGMTString();
};

export const getCookie = (name) => {
    let match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
    return match ? match[2] : "";
};

export const resetLogin = () => {
    cookieCreator('login', "", 5);
}

export const isAnalyst = () => {
    return getCookie('login') === 'analyst';
}

export const isModerator = () => {
    return getCookie('login') === 'moderator';
}

export const rememberLogin = (userType) => {
    cookieCreator('login', userType, 5);
} 
function setMainView(view){
    return {
        header: "partials/header",
        footer: "partials/footer",
        main: `partials/main/${view}`
    }
}

function setNavs(currentHref, navs) {
    const _navs = navs.map(nav => {
        nav.className = "";
        if(nav.href === currentHref){
            nav.className = "active"
        }
        return nav
    })
    return {navs}
}

module.exports = { setMainView, setNavs }
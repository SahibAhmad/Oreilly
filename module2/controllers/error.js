exports.get404 = (req, res, next) => {
    console.log("in not found")
    res.status(404).render('page-not-found', { docTitle: '404', layout: false, path:'/' });
}
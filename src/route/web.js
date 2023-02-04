import express from 'express';
import homeController from '../controllers/homeController';
import middlewareController from '../controllers/middlewareController';
import adminController from '../controllers/adminController/adminController';
import userController from '../controllers/adminController/userController';




const router = express.Router();
const initWebRoutes = (app) => { 
    router.post('/api/login',homeController.loginUser );
    router.post('/api/create-new-user', homeController.registerUser);
    router.get('/api/get-all-user',middlewareController.verifyTokenAndAdminAuth, homeController.getAllUser); //middlewareController.verify
    router.get('/api/get-all-gender', homeController.getAllGender);
    router.get('/api/delete-user',middlewareController.verifyTokenAndAdminAuth, homeController.handleDeleteUser);//middlewareController.verifyTokenAndAdminAuth
    router.post('/api/edit-user',middlewareController.verifyTokenAndAdminAuth, homeController.handleEditUser);
    router.post('/api/create-new-film',middlewareController.verifyTokenAndAdminAuth, homeController.handleCreateFilm);
    router.get('/api/get-all-film', homeController.getAllFilm);

    router.get('/api/get-all-year', homeController.getAllYear);
    router.get('/api/get-detail-film', homeController.getDetailFilm);
    router.get('/api/delete-film',middlewareController.verifyTokenAndAdminAuth, homeController.handleDeleteFilm);
    router.post('/api/edit-film',middlewareController.verifyTokenAndAdminAuth, homeController.handleEditFilm);

    router.post('/api/create-new-category', adminController.handleCreateCategory);
    router.post('/api/refresh', homeController.requestRefreshtoken);

    router.post('/api/logout', homeController.handleLogout);//middlewareController.verify



    // admin
    router.get('/api/get-action-film', adminController.getActionFilm);
    router.get('/api/get-emotion-film', adminController.getEmotionFilm);
    router.get('/api/get-random-film', adminController.getRandomFilm);
    router.get('/api/get-search-film', adminController.getSearchFilm);
    router.post('/api/get-categoryfilm', adminController.getCategoryFilm);

    // user 
    router.get('/api/get-user-detail', userController.getUserDetail);
    router.post('/api/add-to-card', userController.addToCart);
    router.get('/api/get-cart-user', userController.getCartUser);
    router.post('/api/send-remedy', userController.sendRemedy);

    router.get('/api/delete-cart-user',userController.deleteToCart);
    //middlewareController.verifyTokenUser,
    
   


    

   

    return app.use("/", router);
}
export default initWebRoutes;
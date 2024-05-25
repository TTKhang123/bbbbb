import AdminPage from "../pages/AdminPage/AdminPage";
import DetailsOrderPage from "../pages/DetailsOrderPage/DetailsOrderPage";
import HomePage from "../pages/homePage/homePage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import OrderPage from "../pages/OrderPage/OrderPage";
import PaymentPage from "../pages/PaymentPage/PaymentPage";
import ProductDetailsPage from "../pages/DetailProducts/DetailProduct";
import ProductsPage from "../pages/ProductsPage/ProductsPage";
import ProfilePage from "../pages/ProfilePage/ProfilePage";
import SignInPage from "../pages/SingInPage/SignInPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import TypeProductPage from "../pages/Type_Product_Page/TypeProductPage";
import DetailProducts from "../pages/DetailProducts/DetailProduct";

export const routes = [
    {
        path: '/',
        page: HomePage,
        isShowHeader: true,
        isShowFooter: true
    },
    {
        path: '/order',
        page: OrderPage,
        isShowHeader: true,
        isShowFooter: true
    },
    {
        path: '/type',
        page: TypeProductPage ,
        isShowHeader: true,
        isShowFooter: true
    },
    {
        path: '/details-order/:id',
        page: DetailsOrderPage,
        isShowHeader: true,
        isShowFooter: true
    },
    {
        path: '/payment',
        page: PaymentPage,
        isShowHeader: true,
        isShowFooter: true
    },
    {
        path: '/products',
        page: ProductsPage,
        isShowHeader: true,
        isShowFooter: true
    },
    {
        path: '/product/:type',
        page: TypeProductPage,
        isShowHeader: true,
        isShowFooter: true
    },
    {
        path: '/SignInPage',
        page: SignInPage,
    },
    {
        path: '/SignUpPage',
        page: SignUpPage,
    },
    {
        path: '/DetailProducts',
        page: DetailProducts,
        isShowHeader: true,
        isShowFooter: true
    },
    {
        path: '/ProfilePage',
        page: ProfilePage,
        isShowHeader: true,
        isShowFooter: true
    },
    {
        path: '/product-details/:id',
        page: ProductDetailsPage,
        isShowHeader: true,
        isShowFooter: true
    },
    {
        path: 'Admin',
        page: AdminPage,
        isShowHeader: true,
        isShowFooter: true,
        isPrivated: true
    },
    {
        path: '*',
        page: NotFoundPage
    }
]
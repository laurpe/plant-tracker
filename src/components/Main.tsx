import Plants from "./Plants";
import Header from "./Header";
import Column from "./style/Generics/Column";

const Main = () => {
    return (
        <Column padding="0 0 60px 0" backgroundColor="rgb(235, 243, 241)" height="100vh">
            <Header />
            <Plants />
        </Column>
    );
};

export default Main;

import Plants from "./Plants";
import Header from "./Header";
import Column from "./style/Generics/Column";

const Main = () => {
    return (
        <Column padding="0 0 60px 0">
            <Header />
            <Plants />
        </Column>
    );
};

export default Main;

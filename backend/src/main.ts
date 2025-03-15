import {App} from "./app";
import {Container} from "inversify";
import {TYPES} from "./types";
import {appBindings, repositoryBindings} from "./modules";

export interface Bootstrap {
    appContainer: Container;
    app: App
}


function bootstrap(): Bootstrap {
    const appContainer = new Container();
    appContainer.load(appBindings, repositoryBindings);
    const app = appContainer.get<App>(TYPES.Application);
    app.init();
    return {appContainer, app}
}


export const {app, appContainer} = bootstrap();

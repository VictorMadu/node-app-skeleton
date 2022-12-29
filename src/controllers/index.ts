import CreateCommandWithValidator from '../commands/post/create-command/create-command-validator';
import DeleteCommandWithValidator from '../commands/post/delete-command/delete-command-validator';
import EditCommandWithValidator from '../commands/post/edit-command/edit-command-validator';
import GetAllCommandWithValidator from '../commands/post/get-all-command/get-all-command-validator';
import DependencyInjector from '../common/dependency-injector';
import { CreatePost, DeletePost, EditPost, GetPosts } from './post-controllers';

export default function addControllers(DI: DependencyInjector) {
    DI.addInstance(CreatePost, new CreatePost(DI.getInstance(CreateCommandWithValidator)));
    DI.addInstance(EditPost, new EditPost(DI.getInstance(EditCommandWithValidator)));
    DI.addInstance(DeletePost, new DeletePost(DI.getInstance(DeleteCommandWithValidator)));
    DI.addInstance(GetPosts, new GetPosts(DI.getInstance(GetAllCommandWithValidator)));
}

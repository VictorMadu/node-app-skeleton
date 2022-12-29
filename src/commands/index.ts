import DependencyInjector from '../common/dependency-injector';
import PostmarkEmailMessager from '../infrastructures/repository/memory/messagers/postmark-email-messager';
import PostRepository from '../infrastructures/repository/memory/post.repository';
import CreateCommandExecutor from './post/create-command/create-command-executor';
import CreateCommandWithValidator from './post/create-command/create-command-validator';
import DeleteCommandExecutor from './post/delete-command/delete-command-executor';
import DeleteCommandWithValidator from './post/delete-command/delete-command-validator';
import EditCommandExecutor from './post/edit-command/edit-command-executor';
import EditCommandWithValidator from './post/edit-command/edit-command-validator';
import GetAllCommandExecutor from './post/get-all-command/get-all-command-executor';
import GetCommandWithValidator from './post/get-all-command/get-all-command-validator';

export default function addCommands(DI: DependencyInjector) {
    DI.addInstance(
        CreateCommandExecutor,
        new CreateCommandExecutor(
            DI.getInstance(PostRepository),
            DI.getInstance(PostmarkEmailMessager),
        ),
    );

    DI.addInstance(
        CreateCommandWithValidator,
        new CreateCommandWithValidator(DI.getInstance(CreateCommandExecutor)),
    );

    DI.addInstance(EditCommandExecutor, new EditCommandExecutor(DI.getInstance(PostRepository)));

    DI.addInstance(
        EditCommandWithValidator,
        new EditCommandWithValidator(DI.getInstance(EditCommandExecutor)),
    );

    DI.addInstance(
        DeleteCommandExecutor,
        new DeleteCommandExecutor(DI.getInstance(PostRepository)),
    );

    DI.addInstance(
        DeleteCommandWithValidator,
        new DeleteCommandWithValidator(DI.getInstance(DeleteCommandExecutor)),
    );

    DI.addInstance(
        GetAllCommandExecutor,
        new GetAllCommandExecutor(DI.getInstance(PostRepository)),
    );

    DI.addInstance(
        GetCommandWithValidator,
        new GetCommandWithValidator(DI.getInstance(GetAllCommandExecutor)),
    );
}

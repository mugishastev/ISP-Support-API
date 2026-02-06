import { Catch, ArgumentsHost } from '@nestjs/common';
import { GqlArgumentsHost, GqlExceptionFilter as NestGqlExceptionFilter } from '@nestjs/graphql';
import { GraphQLError } from 'graphql';

@Catch()
export class GqlExceptionFilter implements NestGqlExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const gqlHost = GqlArgumentsHost.create(host);

        const message = exception?.message || 'Internal server error';
        const code = exception?.extensions?.code || 'INTERNAL_SERVER_ERROR';

        console.error('GraphQL Error:', {
            message,
            code,
            stack: exception?.stack,
        });

        return new GraphQLError(message, {
            extensions: {
                code,
                timestamp: new Date().toISOString(),
            },
        });
    }
}

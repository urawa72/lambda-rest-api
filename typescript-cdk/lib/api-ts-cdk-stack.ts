import * as cdk from '@aws-cdk/core';
import * as apigw from '@aws-cdk/aws-apigateway';
import * as dynamodb from '@aws-cdk/aws-dynamodb';
import * as lambda from '@aws-cdk/aws-lambda';

export class ApiTsCdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const todoTable = new dynamodb.Table(this, 'todo-table', {
      tableName: 'todos-table',
      partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
      sortKey: { name: 'updatedAt', type: dynamodb.AttributeType.NUMBER },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
    });

    const restApi = new apigw.RestApi(this, 'test-rest-api', {
      restApiName: 'test-rest-api',
      deployOptions: { stageName: 'dev' },
      defaultCorsPreflightOptions: {
        allowOrigins: apigw.Cors.ALL_ORIGINS,
        allowMethods: apigw.Cors.ALL_METHODS,
        statusCode: 200,
      },
    });

    const createFunction = new lambda.Function(this, 'create-todo-function', {
      code: lambda.Code.fromAsset('dist/createTodo'),
      environment: {
        TODOS_TABLE_NAME: 'todos-table',
      },
      functionName: 'create-todo',
      handler: 'index.handler',
      runtime: lambda.Runtime.NODEJS_14_X,
      memorySize: 256,
      timeout: cdk.Duration.seconds(29),
    });
    todoTable.grantWriteData(createFunction);

    const todoResource = restApi.root.addResource('todos');
    todoResource.addMethod('POST', new apigw.LambdaIntegration(createFunction));
  }
}

import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { SPADeploy } from 'cdk-spa-deploy';

export class InfraStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // new SPADeploy(this, 'spaDeploy')
    //     .createBasicSite({
    //       indexDoc: '/earth-3.0/index.html',
    //       websiteFolder: '/earth-3.0/dist',
    //     });

    new SPADeploy(this, 'cfDeploy')
        .createSiteWithCloudfront({
          indexDoc: 'index.html',
          websiteFolder: '../earth-3.0/dist',
        });
  }
}

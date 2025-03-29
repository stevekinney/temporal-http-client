/**
 * This file was automatically generated. Do not modify.
 * Run `bun run generate:client` to update this file.
 */

import type { components } from './schema';

export type TemporalErrorParameters = {
  request: Request;
  response: Response;
  operation: string;
} & ErrorOptions;

export function isTemporalError(error: unknown): error is TemporalError {
  return error instanceof TemporalError;
}

export class TemporalError extends Error {
  static isTemporalError = isTemporalError;

  constructor(message: string, parameters: TemporalErrorParameters) {
    super(message, parameters);
    this.name = 'TemporalError';
  }
}

export default class TemporalClient {
  /**
   * @param baseURL {string} The base URL of the Temporal API.
   * @example
   * const client = new TemporalClient('https://api.temporal.io');
   */
  constructor(private readonly baseURL: string) {}

  /** @description GetClusterInfo returns information about temporal cluster */
  async getClusterInfo(): Promise<
    import('./schemas/get-cluster-info-response.ts').GetClusterInfoResponse
  > {
    const url = new URL(`/api/v1/cluster-info`, this.baseURL);

    const request = new Request(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    const response = await fetch(request);

    if (!response.ok) {
      throw new TemporalError(`${response.status}: getClusterInfo request failed.`, {
        request,
        response,
        operation: 'getClusterInfo',
      });
    }

    const schema = await import('./schemas/get-cluster-info-response.ts');

    return schema.GetClusterInfoResponse.parse(await response.json());
  }

  /** @description ListNamespaces returns the information and configuration for all namespaces. */
  async listNamespaces({
    pageSize,
    nextPageToken,
    namespaceFilterIncludeDeleted,
  }: {
    pageSize?: number;
    nextPageToken?: string;
    namespaceFilterIncludeDeleted?: boolean;
  }): Promise<import('./schemas/list-namespaces-response.ts').ListNamespacesResponse> {
    const url = new URL(`/api/v1/namespaces`, this.baseURL);

    if (pageSize) url.searchParams.append('pageSize', String(pageSize));

    if (nextPageToken) url.searchParams.append('nextPageToken', nextPageToken);

    if (namespaceFilterIncludeDeleted)
      url.searchParams.append(
        'namespaceFilter.includeDeleted',
        String(namespaceFilterIncludeDeleted),
      );

    const request = new Request(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    const response = await fetch(request);

    if (!response.ok) {
      throw new TemporalError(`${response.status}: listNamespaces request failed.`, {
        request,
        response,
        operation: 'listNamespaces',
      });
    }

    return response.json();
  }

  /**
   * @description RegisterNamespace creates a new namespace which can be used as a container for all resources.
   *
   *  A Namespace is a top level entity within Temporal, and is used as a container for resources
   *  like workflow executions, task queues, etc. A Namespace acts as a sandbox and provides
   *  isolation for all resources within the namespace. All resources belongs to exactly one
   *  namespace.
   */
  async registerNamespace(
    body: components['schemas']['RegisterNamespaceRequest'],
  ): Promise<import('./schemas/register-namespace-response.ts').RegisterNamespaceResponse> {
    const url = new URL(`/api/v1/namespaces`, this.baseURL);

    const request = new Request(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const response = await fetch(request);

    if (!response.ok) {
      throw new TemporalError(`${response.status}: registerNamespace request failed.`, {
        request,
        response,
        operation: 'registerNamespace',
      });
    }

    return response.json();
  }

  /** @description DescribeNamespace returns the information and configuration for a registered namespace. */
  async describeNamespace({
    id,
    namespace,
  }: {
    id?: string;
    namespace: string;
  }): Promise<import('./schemas/describe-namespace-response.ts').DescribeNamespaceResponse> {
    const url = new URL(`/api/v1/namespaces/${namespace}`, this.baseURL);

    if (id) url.searchParams.append('id', id);

    const request = new Request(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    const response = await fetch(request);

    if (!response.ok) {
      throw new TemporalError(`${response.status}: describeNamespace request failed.`, {
        request,
        response,
        operation: 'describeNamespace',
      });
    }

    return response.json();
  }

  /**
   * @description RespondActivityTaskFailed is called by workers when processing an activity task fails.
   *
   *  This results in a new `ACTIVITY_TASK_CANCELED` event being written to the workflow history
   *  and a new workflow task created for the workflow. Fails with `NotFound` if the task token is
   *  no longer valid due to activity timeout, already being completed, or never having existed.
   */
  async respondActivityTaskCanceled(
    { namespace }: { namespace: string },
    body: components['schemas']['RespondActivityTaskCanceledRequest'],
  ): Promise<
    import('./schemas/respond-activity-task-canceled-response.ts').RespondActivityTaskCanceledResponse
  > {
    const url = new URL(`/api/v1/namespaces/${namespace}/activities/cancel`, this.baseURL);

    const request = new Request(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const response = await fetch(request);

    if (!response.ok) {
      throw new TemporalError(`${response.status}: respondActivityTaskCanceled request failed.`, {
        request,
        response,
        operation: 'respondActivityTaskCanceled',
      });
    }

    return response.json();
  }

  /**
   * @description See `RecordActivityTaskCanceled`. This version allows clients to record failures by
   *  namespace/workflow id/activity id instead of task token.
   *
   *  (-- api-linter: core::0136::prepositions=disabled
   *      aip.dev/not-precedent: "By" is used to indicate request type. --)
   */
  async respondActivityTaskCanceledById(
    { namespace }: { namespace: string },
    body: components['schemas']['RespondActivityTaskCanceledByIdRequest'],
  ): Promise<
    import('./schemas/respond-activity-task-canceled-by-id-response.ts').RespondActivityTaskCanceledByIdResponse
  > {
    const url = new URL(`/api/v1/namespaces/${namespace}/activities/cancel-by-id`, this.baseURL);

    const request = new Request(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const response = await fetch(request);

    if (!response.ok) {
      throw new TemporalError(
        `${response.status}: respondActivityTaskCanceledById request failed.`,
        { request, response, operation: 'respondActivityTaskCanceledById' },
      );
    }

    return response.json();
  }

  /**
   * @description RespondActivityTaskCompleted is called by workers when they successfully complete an activity
   *  task.
   *
   *  This results in a new `ACTIVITY_TASK_COMPLETED` event being written to the workflow history
   *  and a new workflow task created for the workflow. Fails with `NotFound` if the task token is
   *  no longer valid due to activity timeout, already being completed, or never having existed.
   */
  async respondActivityTaskCompleted(
    { namespace }: { namespace: string },
    body: components['schemas']['RespondActivityTaskCompletedRequest'],
  ): Promise<
    import('./schemas/respond-activity-task-completed-response.ts').RespondActivityTaskCompletedResponse
  > {
    const url = new URL(`/api/v1/namespaces/${namespace}/activities/complete`, this.baseURL);

    const request = new Request(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const response = await fetch(request);

    if (!response.ok) {
      throw new TemporalError(`${response.status}: respondActivityTaskCompleted request failed.`, {
        request,
        response,
        operation: 'respondActivityTaskCompleted',
      });
    }

    return response.json();
  }

  /**
   * @description See `RecordActivityTaskCompleted`. This version allows clients to record completions by
   *  namespace/workflow id/activity id instead of task token.
   *
   *  (-- api-linter: core::0136::prepositions=disabled
   *      aip.dev/not-precedent: "By" is used to indicate request type. --)
   */
  async respondActivityTaskCompletedById(
    { namespace }: { namespace: string },
    body: components['schemas']['RespondActivityTaskCompletedByIdRequest'],
  ): Promise<
    import('./schemas/respond-activity-task-completed-by-id-response.ts').RespondActivityTaskCompletedByIdResponse
  > {
    const url = new URL(`/api/v1/namespaces/${namespace}/activities/complete-by-id`, this.baseURL);

    const request = new Request(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const response = await fetch(request);

    if (!response.ok) {
      throw new TemporalError(
        `${response.status}: respondActivityTaskCompletedById request failed.`,
        { request, response, operation: 'respondActivityTaskCompletedById' },
      );
    }

    return response.json();
  }

  /**
   * @description RespondActivityTaskFailed is called by workers when processing an activity task fails.
   *
   *  This results in a new `ACTIVITY_TASK_FAILED` event being written to the workflow history and
   *  a new workflow task created for the workflow. Fails with `NotFound` if the task token is no
   *  longer valid due to activity timeout, already being completed, or never having existed.
   */
  async respondActivityTaskFailed(
    { namespace }: { namespace: string },
    body: components['schemas']['RespondActivityTaskFailedRequest'],
  ): Promise<
    import('./schemas/respond-activity-task-failed-response.ts').RespondActivityTaskFailedResponse
  > {
    const url = new URL(`/api/v1/namespaces/${namespace}/activities/fail`, this.baseURL);

    const request = new Request(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const response = await fetch(request);

    if (!response.ok) {
      throw new TemporalError(`${response.status}: respondActivityTaskFailed request failed.`, {
        request,
        response,
        operation: 'respondActivityTaskFailed',
      });
    }

    return response.json();
  }

  /**
   * @description See `RecordActivityTaskFailed`. This version allows clients to record failures by
   *  namespace/workflow id/activity id instead of task token.
   *
   *  (-- api-linter: core::0136::prepositions=disabled
   *      aip.dev/not-precedent: "By" is used to indicate request type. --)
   */
  async respondActivityTaskFailedById(
    { namespace }: { namespace: string },
    body: components['schemas']['RespondActivityTaskFailedByIdRequest'],
  ): Promise<
    import('./schemas/respond-activity-task-failed-by-id-response.ts').RespondActivityTaskFailedByIdResponse
  > {
    const url = new URL(`/api/v1/namespaces/${namespace}/activities/fail-by-id`, this.baseURL);

    const request = new Request(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const response = await fetch(request);

    if (!response.ok) {
      throw new TemporalError(`${response.status}: respondActivityTaskFailedById request failed.`, {
        request,
        response,
        operation: 'respondActivityTaskFailedById',
      });
    }

    return response.json();
  }

  /**
   * @description RecordActivityTaskHeartbeat is optionally called by workers while they execute activities.
   *
   *  If worker fails to heartbeat within the `heartbeat_timeout` interval for the activity task,
   *  then it will be marked as timed out and an `ACTIVITY_TASK_TIMED_OUT` event will be written to
   *  the workflow history. Calling `RecordActivityTaskHeartbeat` will fail with `NotFound` in
   *  such situations, in that event, the SDK should request cancellation of the activity.
   */
  async recordActivityTaskHeartbeat(
    { namespace }: { namespace: string },
    body: components['schemas']['RecordActivityTaskHeartbeatRequest'],
  ): Promise<
    import('./schemas/record-activity-task-heartbeat-response.ts').RecordActivityTaskHeartbeatResponse
  > {
    const url = new URL(`/api/v1/namespaces/${namespace}/activities/heartbeat`, this.baseURL);

    const request = new Request(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const response = await fetch(request);

    if (!response.ok) {
      throw new TemporalError(`${response.status}: recordActivityTaskHeartbeat request failed.`, {
        request,
        response,
        operation: 'recordActivityTaskHeartbeat',
      });
    }

    return response.json();
  }

  /**
   * @description See `RecordActivityTaskHeartbeat`. This version allows clients to record heartbeats by
   *  namespace/workflow id/activity id instead of task token.
   *
   *  (-- api-linter: core::0136::prepositions=disabled
   *      aip.dev/not-precedent: "By" is used to indicate request type. --)
   */
  async recordActivityTaskHeartbeatById(
    { namespace }: { namespace: string },
    body: components['schemas']['RecordActivityTaskHeartbeatByIdRequest'],
  ): Promise<
    import('./schemas/record-activity-task-heartbeat-by-id-response.ts').RecordActivityTaskHeartbeatByIdResponse
  > {
    const url = new URL(`/api/v1/namespaces/${namespace}/activities/heartbeat-by-id`, this.baseURL);

    const request = new Request(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const response = await fetch(request);

    if (!response.ok) {
      throw new TemporalError(
        `${response.status}: recordActivityTaskHeartbeatById request failed.`,
        { request, response, operation: 'recordActivityTaskHeartbeatById' },
      );
    }

    return response.json();
  }

  /**
   * @description PauseActivity pauses the execution of an activity specified by its ID or type.
   *  If there are multiple pending activities of the provided type - all of them will be paused
   *
   *  Pausing an activity means:
   *  - If the activity is currently waiting for a retry or is running and subsequently fails,
   *    it will not be rescheduled until it is unpaused.
   *  - If the activity is already paused, calling this method will have no effect.
   *  - If the activity is running and finishes successfully, the activity will be completed.
   *  - If the activity is running and finishes with failure:
   *    * if there is no retry left - the activity will be completed.
   *    * if there are more retries left - the activity will be paused.
   *  For long-running activities:
   *  - activities in paused state will send a cancellation with "activity_paused" set to 'true' in response to 'RecordActivityTaskHeartbeat'.
   *  - The activity should respond to the cancellation accordingly.
   *
   *  Returns a `NotFound` error if there is no pending activity with the provided ID or type
   */
  async pauseActivity(
    { namespace }: { namespace: string },
    body: components['schemas']['PauseActivityRequest'],
  ): Promise<import('./schemas/pause-activity-response.ts').PauseActivityResponse> {
    const url = new URL(`/api/v1/namespaces/${namespace}/activities/pause`, this.baseURL);

    const request = new Request(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const response = await fetch(request);

    if (!response.ok) {
      throw new TemporalError(`${response.status}: pauseActivity request failed.`, {
        request,
        response,
        operation: 'pauseActivity',
      });
    }

    return response.json();
  }

  /**
   * @description ResetActivity resets the execution of an activity specified by its ID or type.
   *  If there are multiple pending activities of the provided type - all of them will be reset.
   *
   *  Resetting an activity means:
   *  * number of attempts will be reset to 0.
   *  * activity timeouts will be reset.
   *  * if the activity is waiting for retry, and it is not paused or 'keep_paused' is not provided:
   *     it will be scheduled immediately (* see 'jitter' flag),
   *
   *  Flags:
   *
   *  'jitter': the activity will be scheduled at a random time within the jitter duration.
   *  If the activity currently paused it will be unpaused, unless 'keep_paused' flag is provided.
   *  'reset_heartbeats': the activity heartbeat timer and heartbeats will be reset.
   *  'keep_paused': if the activity is paused, it will remain paused.
   *
   *  Returns a `NotFound` error if there is no pending activity with the provided ID or type.
   */
  async resetActivity(
    { namespace }: { namespace: string },
    body: components['schemas']['ResetActivityRequest'],
  ): Promise<import('./schemas/reset-activity-response.ts').ResetActivityResponse> {
    const url = new URL(`/api/v1/namespaces/${namespace}/activities/reset`, this.baseURL);

    const request = new Request(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const response = await fetch(request);

    if (!response.ok) {
      throw new TemporalError(`${response.status}: resetActivity request failed.`, {
        request,
        response,
        operation: 'resetActivity',
      });
    }

    return response.json();
  }

  /**
   * @description UnpauseActivity unpauses the execution of an activity specified by its ID or type.
   *  If there are multiple pending activities of the provided type - all of them will be unpaused.
   *
   *  If activity is not paused, this call will have no effect.
   *  If the activity was paused while waiting for retry, it will be scheduled immediately (* see 'jitter' flag).
   *  Once the activity is unpaused, all timeout timers will be regenerated.
   *
   *  Flags:
   *  'jitter': the activity will be scheduled at a random time within the jitter duration.
   *  'reset_attempts': the number of attempts will be reset.
   *  'reset_heartbeat': the activity heartbeat timer and heartbeats will be reset.
   *
   *  Returns a `NotFound` error if there is no pending activity with the provided ID or type
   */
  async unpauseActivity(
    { namespace }: { namespace: string },
    body: components['schemas']['UnpauseActivityRequest'],
  ): Promise<import('./schemas/unpause-activity-response.ts').UnpauseActivityResponse> {
    const url = new URL(`/api/v1/namespaces/${namespace}/activities/unpause`, this.baseURL);

    const request = new Request(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const response = await fetch(request);

    if (!response.ok) {
      throw new TemporalError(`${response.status}: unpauseActivity request failed.`, {
        request,
        response,
        operation: 'unpauseActivity',
      });
    }

    return response.json();
  }

  /**
   * @description UpdateActivityOptions is called by the client to update the options of an activity by its ID or type.
   *  If there are multiple pending activities of the provided type - all of them will be updated.
   */
  async updateActivityOptions(
    { namespace }: { namespace: string },
    body: components['schemas']['UpdateActivityOptionsRequest'],
  ): Promise<
    import('./schemas/update-activity-options-response.ts').UpdateActivityOptionsResponse
  > {
    const url = new URL(`/api/v1/namespaces/${namespace}/activities/update-options`, this.baseURL);

    const request = new Request(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const response = await fetch(request);

    if (!response.ok) {
      throw new TemporalError(`${response.status}: updateActivityOptions request failed.`, {
        request,
        response,
        operation: 'updateActivityOptions',
      });
    }

    return response.json();
  }

  /** @description ListArchivedWorkflowExecutions is a visibility API to list archived workflow executions in a specific namespace. */
  async listArchivedWorkflowExecutions({
    pageSize,
    nextPageToken,
    query,
    namespace,
  }: {
    pageSize?: number;
    nextPageToken?: string;
    query?: string;
    namespace: string;
  }): Promise<
    import('./schemas/list-archived-workflow-executions-response.ts').ListArchivedWorkflowExecutionsResponse
  > {
    const url = new URL(`/api/v1/namespaces/${namespace}/archived-workflows`, this.baseURL);

    if (pageSize) url.searchParams.append('pageSize', String(pageSize));

    if (nextPageToken) url.searchParams.append('nextPageToken', nextPageToken);

    if (query) url.searchParams.append('query', query);

    const request = new Request(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    const response = await fetch(request);

    if (!response.ok) {
      throw new TemporalError(
        `${response.status}: listArchivedWorkflowExecutions request failed.`,
        { request, response, operation: 'listArchivedWorkflowExecutions' },
      );
    }

    return response.json();
  }

  /** @description ListBatchOperations returns a list of batch operations */
  async listBatchOperations({
    pageSize,
    nextPageToken,
    namespace,
  }: {
    pageSize?: number;
    nextPageToken?: string;
    namespace: string;
  }): Promise<import('./schemas/list-batch-operations-response.ts').ListBatchOperationsResponse> {
    const url = new URL(`/api/v1/namespaces/${namespace}/batch-operations`, this.baseURL);

    if (pageSize) url.searchParams.append('pageSize', String(pageSize));

    if (nextPageToken) url.searchParams.append('nextPageToken', nextPageToken);

    const request = new Request(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    const response = await fetch(request);

    if (!response.ok) {
      throw new TemporalError(`${response.status}: listBatchOperations request failed.`, {
        request,
        response,
        operation: 'listBatchOperations',
      });
    }

    return response.json();
  }

  /** @description DescribeBatchOperation returns the information about a batch operation */
  async describeBatchOperation({
    namespace,
    jobId,
  }: {
    namespace: string;
    jobId: string;
  }): Promise<
    import('./schemas/describe-batch-operation-response.ts').DescribeBatchOperationResponse
  > {
    const url = new URL(`/api/v1/namespaces/${namespace}/batch-operations/${jobId}`, this.baseURL);

    const request = new Request(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    const response = await fetch(request);

    if (!response.ok) {
      throw new TemporalError(`${response.status}: describeBatchOperation request failed.`, {
        request,
        response,
        operation: 'describeBatchOperation',
      });
    }

    return response.json();
  }

  /** @description StartBatchOperation starts a new batch operation */
  async startBatchOperation(
    { namespace, jobId }: { namespace: string; jobId: string },
    body: components['schemas']['StartBatchOperationRequest'],
  ): Promise<import('./schemas/start-batch-operation-response.ts').StartBatchOperationResponse> {
    const url = new URL(`/api/v1/namespaces/${namespace}/batch-operations/${jobId}`, this.baseURL);

    const request = new Request(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const response = await fetch(request);

    if (!response.ok) {
      throw new TemporalError(`${response.status}: startBatchOperation request failed.`, {
        request,
        response,
        operation: 'startBatchOperation',
      });
    }

    return response.json();
  }

  /** @description StopBatchOperation stops a batch operation */
  async stopBatchOperation(
    { namespace, jobId }: { namespace: string; jobId: string },
    body: components['schemas']['StopBatchOperationRequest'],
  ): Promise<import('./schemas/stop-batch-operation-response.ts').StopBatchOperationResponse> {
    const url = new URL(
      `/api/v1/namespaces/${namespace}/batch-operations/${jobId}/stop`,
      this.baseURL,
    );

    const request = new Request(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const response = await fetch(request);

    if (!response.ok) {
      throw new TemporalError(`${response.status}: stopBatchOperation request failed.`, {
        request,
        response,
        operation: 'stopBatchOperation',
      });
    }

    return response.json();
  }

  /**
   * @description Sets a deployment as the current deployment for its deployment series. Can optionally update
   *  the metadata of the deployment as well.
   *  Experimental. This API might significantly change or be removed in a future release.
   *  Deprecated. Replaced by `SetWorkerDeploymentCurrentVersion`.
   */
  async setCurrentDeployment(
    { namespace, seriesName }: { namespace: string; seriesName: string },
    body: components['schemas']['SetCurrentDeploymentRequest'],
  ): Promise<import('./schemas/set-current-deployment-response.ts').SetCurrentDeploymentResponse> {
    const url = new URL(
      `/api/v1/namespaces/${namespace}/current-deployment/${seriesName}`,
      this.baseURL,
    );

    const request = new Request(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const response = await fetch(request);

    if (!response.ok) {
      throw new TemporalError(`${response.status}: setCurrentDeployment request failed.`, {
        request,
        response,
        operation: 'setCurrentDeployment',
      });
    }

    return response.json();
  }

  /**
   * @description Returns the current deployment (and its info) for a given deployment series.
   *  Experimental. This API might significantly change or be removed in a future release.
   *  Deprecated. Replaced by `current_version` returned by `DescribeWorkerDeployment`.
   */
  async getCurrentDeployment({
    namespace,
    seriesName,
  }: {
    namespace: string;
    seriesName: string;
  }): Promise<import('./schemas/get-current-deployment-response.ts').GetCurrentDeploymentResponse> {
    const url = new URL(
      `/api/v1/namespaces/${namespace}/current-deployment/${seriesName}`,
      this.baseURL,
    );

    const request = new Request(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    const response = await fetch(request);

    if (!response.ok) {
      throw new TemporalError(`${response.status}: getCurrentDeployment request failed.`, {
        request,
        response,
        operation: 'getCurrentDeployment',
      });
    }

    return response.json();
  }

  /**
   * @description Lists worker deployments in the namespace. Optionally can filter based on deployment series
   *  name.
   *  Experimental. This API might significantly change or be removed in a future release.
   *  Deprecated. Replaced with `ListWorkerDeployments`.
   */
  async listDeployments({
    pageSize,
    nextPageToken,
    seriesName,
    namespace,
  }: {
    pageSize?: number;
    nextPageToken?: string;
    seriesName?: string;
    namespace: string;
  }): Promise<import('./schemas/list-deployments-response.ts').ListDeploymentsResponse> {
    const url = new URL(`/api/v1/namespaces/${namespace}/deployments`, this.baseURL);

    if (pageSize) url.searchParams.append('pageSize', String(pageSize));

    if (nextPageToken) url.searchParams.append('nextPageToken', nextPageToken);

    if (seriesName) url.searchParams.append('seriesName', seriesName);

    const request = new Request(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    const response = await fetch(request);

    if (!response.ok) {
      throw new TemporalError(`${response.status}: listDeployments request failed.`, {
        request,
        response,
        operation: 'listDeployments',
      });
    }

    return response.json();
  }

  /**
   * @description Describes a worker deployment.
   *  Experimental. This API might significantly change or be removed in a future release.
   *  Deprecated. Replaced with `DescribeWorkerDeploymentVersion`.
   */
  async describeDeployment({
    deploymentSeriesName,
    deploymentBuildId,
    namespace,
    seriesName,
    buildId,
  }: {
    deploymentSeriesName?: string;
    deploymentBuildId?: string;
    namespace: string;
    seriesName: string;
    buildId: string;
  }): Promise<import('./schemas/describe-deployment-response.ts').DescribeDeploymentResponse> {
    const url = new URL(
      `/api/v1/namespaces/${namespace}/deployments/${seriesName}/${buildId}`,
      this.baseURL,
    );

    if (deploymentSeriesName)
      url.searchParams.append('deployment.seriesName', deploymentSeriesName);

    if (deploymentBuildId) url.searchParams.append('deployment.buildId', deploymentBuildId);

    const request = new Request(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    const response = await fetch(request);

    if (!response.ok) {
      throw new TemporalError(`${response.status}: describeDeployment request failed.`, {
        request,
        response,
        operation: 'describeDeployment',
      });
    }

    return response.json();
  }

  /**
   * @description Returns the reachability level of a worker deployment to help users decide when it is time
   *  to decommission a deployment. Reachability level is calculated based on the deployment's
   *  `status` and existing workflows that depend on the given deployment for their execution.
   *  Calculating reachability is relatively expensive. Therefore, server might return a recently
   *  cached value. In such a case, the `last_update_time` will inform you about the actual
   *  reachability calculation time.
   *  Experimental. This API might significantly change or be removed in a future release.
   *  Deprecated. Replaced with `DrainageInfo` returned by `DescribeWorkerDeploymentVersion`.
   */
  async getDeploymentReachability({
    deploymentSeriesName,
    deploymentBuildId,
    namespace,
    seriesName,
    buildId,
  }: {
    deploymentSeriesName?: string;
    deploymentBuildId?: string;
    namespace: string;
    seriesName: string;
    buildId: string;
  }): Promise<
    import('./schemas/get-deployment-reachability-response.ts').GetDeploymentReachabilityResponse
  > {
    const url = new URL(
      `/api/v1/namespaces/${namespace}/deployments/${seriesName}/${buildId}/reachability`,
      this.baseURL,
    );

    if (deploymentSeriesName)
      url.searchParams.append('deployment.seriesName', deploymentSeriesName);

    if (deploymentBuildId) url.searchParams.append('deployment.buildId', deploymentBuildId);

    const request = new Request(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    const response = await fetch(request);

    if (!response.ok) {
      throw new TemporalError(`${response.status}: getDeploymentReachability request failed.`, {
        request,
        response,
        operation: 'getDeploymentReachability',
      });
    }

    return response.json();
  }

  /** @description List all schedules in a namespace. */
  async listSchedules({
    maximumPageSize,
    nextPageToken,
    query,
    namespace,
  }: {
    maximumPageSize?: number;
    nextPageToken?: string;
    query?: string;
    namespace: string;
  }): Promise<import('./schemas/list-schedules-response.ts').ListSchedulesResponse> {
    const url = new URL(`/api/v1/namespaces/${namespace}/schedules`, this.baseURL);

    if (maximumPageSize) url.searchParams.append('maximumPageSize', String(maximumPageSize));

    if (nextPageToken) url.searchParams.append('nextPageToken', nextPageToken);

    if (query) url.searchParams.append('query', query);

    const request = new Request(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    const response = await fetch(request);

    if (!response.ok) {
      throw new TemporalError(`${response.status}: listSchedules request failed.`, {
        request,
        response,
        operation: 'listSchedules',
      });
    }

    return response.json();
  }

  /** @description Returns the schedule description and current state of an existing schedule. */
  async describeSchedule({
    namespace,
    scheduleId,
  }: {
    namespace: string;
    scheduleId: string;
  }): Promise<import('./schemas/describe-schedule-response.ts').DescribeScheduleResponse> {
    const url = new URL(`/api/v1/namespaces/${namespace}/schedules/${scheduleId}`, this.baseURL);

    const request = new Request(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    const response = await fetch(request);

    if (!response.ok) {
      throw new TemporalError(`${response.status}: describeSchedule request failed.`, {
        request,
        response,
        operation: 'describeSchedule',
      });
    }

    return response.json();
  }

  /** @description Creates a new schedule. */
  async createSchedule(
    { namespace, scheduleId }: { namespace: string; scheduleId: string },
    body: components['schemas']['CreateScheduleRequest'],
  ): Promise<import('./schemas/create-schedule-response.ts').CreateScheduleResponse> {
    const url = new URL(`/api/v1/namespaces/${namespace}/schedules/${scheduleId}`, this.baseURL);

    const request = new Request(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const response = await fetch(request);

    if (!response.ok) {
      throw new TemporalError(`${response.status}: createSchedule request failed.`, {
        request,
        response,
        operation: 'createSchedule',
      });
    }

    return response.json();
  }

  /** @description Deletes a schedule, removing it from the system. */
  async deleteSchedule({
    identity,
    namespace,
    scheduleId,
  }: {
    identity?: string;
    namespace: string;
    scheduleId: string;
  }): Promise<import('./schemas/delete-schedule-response.ts').DeleteScheduleResponse> {
    const url = new URL(`/api/v1/namespaces/${namespace}/schedules/${scheduleId}`, this.baseURL);

    if (identity) url.searchParams.append('identity', identity);

    const request = new Request(url, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });

    const response = await fetch(request);

    if (!response.ok) {
      throw new TemporalError(`${response.status}: deleteSchedule request failed.`, {
        request,
        response,
        operation: 'deleteSchedule',
      });
    }

    return response.json();
  }

  /** @description Lists matching times within a range. */
  async listScheduleMatchingTimes({
    startTime,
    endTime,
    namespace,
    scheduleId,
  }: {
    startTime?: string;
    endTime?: string;
    namespace: string;
    scheduleId: string;
  }): Promise<
    import('./schemas/list-schedule-matching-times-response.ts').ListScheduleMatchingTimesResponse
  > {
    const url = new URL(
      `/api/v1/namespaces/${namespace}/schedules/${scheduleId}/matching-times`,
      this.baseURL,
    );

    if (startTime) url.searchParams.append('startTime', startTime);

    if (endTime) url.searchParams.append('endTime', endTime);

    const request = new Request(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    const response = await fetch(request);

    if (!response.ok) {
      throw new TemporalError(`${response.status}: listScheduleMatchingTimes request failed.`, {
        request,
        response,
        operation: 'listScheduleMatchingTimes',
      });
    }

    return response.json();
  }

  /** @description Makes a specific change to a schedule or triggers an immediate action. */
  async patchSchedule(
    { namespace, scheduleId }: { namespace: string; scheduleId: string },
    body: components['schemas']['PatchScheduleRequest'],
  ): Promise<import('./schemas/patch-schedule-response.ts').PatchScheduleResponse> {
    const url = new URL(
      `/api/v1/namespaces/${namespace}/schedules/${scheduleId}/patch`,
      this.baseURL,
    );

    const request = new Request(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const response = await fetch(request);

    if (!response.ok) {
      throw new TemporalError(`${response.status}: patchSchedule request failed.`, {
        request,
        response,
        operation: 'patchSchedule',
      });
    }

    return response.json();
  }

  /** @description Changes the configuration or state of an existing schedule. */
  async updateSchedule(
    { namespace, scheduleId }: { namespace: string; scheduleId: string },
    body: components['schemas']['UpdateScheduleRequest'],
  ): Promise<import('./schemas/update-schedule-response.ts').UpdateScheduleResponse> {
    const url = new URL(
      `/api/v1/namespaces/${namespace}/schedules/${scheduleId}/update`,
      this.baseURL,
    );

    const request = new Request(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const response = await fetch(request);

    if (!response.ok) {
      throw new TemporalError(`${response.status}: updateSchedule request failed.`, {
        request,
        response,
        operation: 'updateSchedule',
      });
    }

    return response.json();
  }

  /** @description ListSearchAttributes returns comprehensive information about search attributes. */
  async listSearchAttributes({
    namespace,
  }: {
    namespace: string;
  }): Promise<import('./schemas/list-search-attributes-response.ts').ListSearchAttributesResponse> {
    const url = new URL(`/api/v1/namespaces/${namespace}/search-attributes`, this.baseURL);

    const request = new Request(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    const response = await fetch(request);

    if (!response.ok) {
      throw new TemporalError(`${response.status}: listSearchAttributes request failed.`, {
        request,
        response,
        operation: 'listSearchAttributes',
      });
    }

    return response.json();
  }

  /**
   * @description DescribeTaskQueue returns the following information about the target task queue, broken down by Build ID:
   *    - List of pollers
   *    - Workflow Reachability status
   *    - Backlog info for Workflow and/or Activity tasks
   */
  async describeTaskQueue({
    taskQueueName,
    taskQueueKind,
    taskQueueNormalName,
    taskQueueType,
    includeTaskQueueStatus,
    apiMode,
    versionsBuildIds,
    versionsUnversioned,
    versionsAllActive,
    taskQueueTypes,
    reportStats,
    reportPollers,
    reportTaskReachability,
    namespace,
    name,
  }: {
    taskQueueName?: string;
    taskQueueKind?:
      | 'TASK_QUEUE_KIND_UNSPECIFIED'
      | 'TASK_QUEUE_KIND_NORMAL'
      | 'TASK_QUEUE_KIND_STICKY';
    taskQueueNormalName?: string;
    taskQueueType?:
      | 'TASK_QUEUE_TYPE_UNSPECIFIED'
      | 'TASK_QUEUE_TYPE_WORKFLOW'
      | 'TASK_QUEUE_TYPE_ACTIVITY'
      | 'TASK_QUEUE_TYPE_NEXUS';
    includeTaskQueueStatus?: boolean;
    apiMode?: 'DESCRIBE_TASK_QUEUE_MODE_UNSPECIFIED' | 'DESCRIBE_TASK_QUEUE_MODE_ENHANCED';
    versionsBuildIds?: readonly string[];
    versionsUnversioned?: boolean;
    versionsAllActive?: boolean;
    taskQueueTypes?: readonly (
      | 'TASK_QUEUE_TYPE_UNSPECIFIED'
      | 'TASK_QUEUE_TYPE_WORKFLOW'
      | 'TASK_QUEUE_TYPE_ACTIVITY'
      | 'TASK_QUEUE_TYPE_NEXUS'
    )[];
    reportStats?: boolean;
    reportPollers?: boolean;
    reportTaskReachability?: boolean;
    namespace: string;
    name: string;
  }): Promise<import('./schemas/describe-task-queue-response.ts').DescribeTaskQueueResponse> {
    const url = new URL(`/api/v1/namespaces/${namespace}/task-queues/${name}`, this.baseURL);

    if (taskQueueName) url.searchParams.append('taskQueue.name', taskQueueName);

    if (taskQueueKind) url.searchParams.append('taskQueue.kind', taskQueueKind);

    if (taskQueueNormalName) url.searchParams.append('taskQueue.normalName', taskQueueNormalName);

    if (taskQueueType) url.searchParams.append('taskQueueType', taskQueueType);

    if (includeTaskQueueStatus)
      url.searchParams.append('includeTaskQueueStatus', String(includeTaskQueueStatus));

    if (apiMode) url.searchParams.append('apiMode', apiMode);

    if (versionsBuildIds) url.searchParams.append('versions.buildIds', versionsBuildIds.join(','));

    if (versionsUnversioned)
      url.searchParams.append('versions.unversioned', String(versionsUnversioned));

    if (versionsAllActive) url.searchParams.append('versions.allActive', String(versionsAllActive));

    if (taskQueueTypes) url.searchParams.append('taskQueueTypes', taskQueueTypes.join(','));

    if (reportStats) url.searchParams.append('reportStats', String(reportStats));

    if (reportPollers) url.searchParams.append('reportPollers', String(reportPollers));

    if (reportTaskReachability)
      url.searchParams.append('reportTaskReachability', String(reportTaskReachability));

    const request = new Request(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    const response = await fetch(request);

    if (!response.ok) {
      throw new TemporalError(`${response.status}: describeTaskQueue request failed.`, {
        request,
        response,
        operation: 'describeTaskQueue',
      });
    }

    return response.json();
  }

  /**
   * @description Deprecated. Use `GetWorkerVersioningRules`.
   *  Fetches the worker build id versioning sets for a task queue.
   */
  async getWorkerBuildIdCompatibility({
    maxSets,
    namespace,
    taskQueue,
  }: {
    maxSets?: number;
    namespace: string;
    taskQueue: string;
  }): Promise<
    import('./schemas/get-worker-build-id-compatibility-response.ts').GetWorkerBuildIdCompatibilityResponse
  > {
    const url = new URL(
      `/api/v1/namespaces/${namespace}/task-queues/${taskQueue}/worker-build-id-compatibility`,
      this.baseURL,
    );

    if (maxSets) url.searchParams.append('maxSets', String(maxSets));

    const request = new Request(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    const response = await fetch(request);

    if (!response.ok) {
      throw new TemporalError(`${response.status}: getWorkerBuildIdCompatibility request failed.`, {
        request,
        response,
        operation: 'getWorkerBuildIdCompatibility',
      });
    }

    return response.json();
  }

  /**
   * @description Fetches the Build ID assignment and redirect rules for a Task Queue.
   *  WARNING: Worker Versioning is not yet stable and the API and behavior may change incompatibly.
   */
  async getWorkerVersioningRules({
    namespace,
    taskQueue,
  }: {
    namespace: string;
    taskQueue: string;
  }): Promise<
    import('./schemas/get-worker-versioning-rules-response.ts').GetWorkerVersioningRulesResponse
  > {
    const url = new URL(
      `/api/v1/namespaces/${namespace}/task-queues/${taskQueue}/worker-versioning-rules`,
      this.baseURL,
    );

    const request = new Request(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    const response = await fetch(request);

    if (!response.ok) {
      throw new TemporalError(`${response.status}: getWorkerVersioningRules request failed.`, {
        request,
        response,
        operation: 'getWorkerVersioningRules',
      });
    }

    return response.json();
  }

  /**
   * @description UpdateNamespace is used to update the information and configuration of a registered
   *  namespace.
   */
  async updateNamespace(
    { namespace }: { namespace: string },
    body: components['schemas']['UpdateNamespaceRequest'],
  ): Promise<import('./schemas/update-namespace-response.ts').UpdateNamespaceResponse> {
    const url = new URL(`/api/v1/namespaces/${namespace}/update`, this.baseURL);

    const request = new Request(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const response = await fetch(request);

    if (!response.ok) {
      throw new TemporalError(`${response.status}: updateNamespace request failed.`, {
        request,
        response,
        operation: 'updateNamespace',
      });
    }

    return response.json();
  }

  /**
   * @description Describes a worker deployment version.
   *  Experimental. This API might significantly change or be removed in a future release.
   */
  async describeWorkerDeploymentVersion({
    namespace,
    version,
  }: {
    namespace: string;
    version: string;
  }): Promise<
    import('./schemas/describe-worker-deployment-version-response.ts').DescribeWorkerDeploymentVersionResponse
  > {
    const url = new URL(
      `/api/v1/namespaces/${namespace}/worker-deployment-versions/${version}`,
      this.baseURL,
    );

    const request = new Request(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    const response = await fetch(request);

    if (!response.ok) {
      throw new TemporalError(
        `${response.status}: describeWorkerDeploymentVersion request failed.`,
        { request, response, operation: 'describeWorkerDeploymentVersion' },
      );
    }

    return response.json();
  }

  /**
   * @description Used for manual deletion of Versions. User can delete a Version only when all the
   *  following conditions are met:
   *   - It is not the Current or Ramping Version of its Deployment.
   *   - It has no active pollers (none of the task queues in the Version have pollers)
   *   - It is not draining (see WorkerDeploymentVersionInfo.drainage_info). This condition
   *     can be skipped by passing `skip-drainage=true`.
   *  Experimental. This API might significantly change or be removed in a future release.
   */
  async deleteWorkerDeploymentVersion({
    skipDrainage,
    identity,
    namespace,
    version,
  }: {
    skipDrainage?: boolean;
    identity?: string;
    namespace: string;
    version: string;
  }): Promise<
    import('./schemas/delete-worker-deployment-version-response.ts').DeleteWorkerDeploymentVersionResponse
  > {
    const url = new URL(
      `/api/v1/namespaces/${namespace}/worker-deployment-versions/${version}`,
      this.baseURL,
    );

    if (skipDrainage) url.searchParams.append('skipDrainage', String(skipDrainage));

    if (identity) url.searchParams.append('identity', identity);

    const request = new Request(url, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });

    const response = await fetch(request);

    if (!response.ok) {
      throw new TemporalError(`${response.status}: deleteWorkerDeploymentVersion request failed.`, {
        request,
        response,
        operation: 'deleteWorkerDeploymentVersion',
      });
    }

    return response.json();
  }

  /**
   * @description Updates the user-given metadata attached to a Worker Deployment Version.
   *  Experimental. This API might significantly change or be removed in a future release.
   */
  async updateWorkerDeploymentVersionMetadata(
    { namespace, version }: { namespace: string; version: string },
    body: components['schemas']['UpdateWorkerDeploymentVersionMetadataRequest'],
  ): Promise<
    import('./schemas/update-worker-deployment-version-metadata-response.ts').UpdateWorkerDeploymentVersionMetadataResponse
  > {
    const url = new URL(
      `/api/v1/namespaces/${namespace}/worker-deployment-versions/${version}/update-metadata`,
      this.baseURL,
    );

    const request = new Request(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const response = await fetch(request);

    if (!response.ok) {
      throw new TemporalError(
        `${response.status}: updateWorkerDeploymentVersionMetadata request failed.`,
        { request, response, operation: 'updateWorkerDeploymentVersionMetadata' },
      );
    }

    return response.json();
  }

  /**
   * @description Lists all Worker Deployments that are tracked in the Namespace.
   *  Experimental. This API might significantly change or be removed in a future release.
   */
  async listWorkerDeployments({
    pageSize,
    nextPageToken,
    namespace,
  }: {
    pageSize?: number;
    nextPageToken?: string;
    namespace: string;
  }): Promise<
    import('./schemas/list-worker-deployments-response.ts').ListWorkerDeploymentsResponse
  > {
    const url = new URL(`/api/v1/namespaces/${namespace}/worker-deployments`, this.baseURL);

    if (pageSize) url.searchParams.append('pageSize', String(pageSize));

    if (nextPageToken) url.searchParams.append('nextPageToken', nextPageToken);

    const request = new Request(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    const response = await fetch(request);

    if (!response.ok) {
      throw new TemporalError(`${response.status}: listWorkerDeployments request failed.`, {
        request,
        response,
        operation: 'listWorkerDeployments',
      });
    }

    return response.json();
  }

  /**
   * @description Describes a Worker Deployment.
   *  Experimental. This API might significantly change or be removed in a future release.
   */
  async describeWorkerDeployment({
    namespace,
    deploymentName,
  }: {
    namespace: string;
    deploymentName: string;
  }): Promise<
    import('./schemas/describe-worker-deployment-response.ts').DescribeWorkerDeploymentResponse
  > {
    const url = new URL(
      `/api/v1/namespaces/${namespace}/worker-deployments/${deploymentName}`,
      this.baseURL,
    );

    const request = new Request(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    const response = await fetch(request);

    if (!response.ok) {
      throw new TemporalError(`${response.status}: describeWorkerDeployment request failed.`, {
        request,
        response,
        operation: 'describeWorkerDeployment',
      });
    }

    return response.json();
  }

  /**
   * @description Deletes records of (an old) Deployment. A deployment can only be deleted if
   *  it has no Version in it.
   *  Experimental. This API might significantly change or be removed in a future release.
   */
  async deleteWorkerDeployment({
    identity,
    namespace,
    deploymentName,
  }: {
    identity?: string;
    namespace: string;
    deploymentName: string;
  }): Promise<
    import('./schemas/delete-worker-deployment-response.ts').DeleteWorkerDeploymentResponse
  > {
    const url = new URL(
      `/api/v1/namespaces/${namespace}/worker-deployments/${deploymentName}`,
      this.baseURL,
    );

    if (identity) url.searchParams.append('identity', identity);

    const request = new Request(url, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });

    const response = await fetch(request);

    if (!response.ok) {
      throw new TemporalError(`${response.status}: deleteWorkerDeployment request failed.`, {
        request,
        response,
        operation: 'deleteWorkerDeployment',
      });
    }

    return response.json();
  }

  /**
   * @description Set/unset the Current Version of a Worker Deployment. Automatically unsets the Ramping
   *  Version if it is the Version being set as Current.
   *  Experimental. This API might significantly change or be removed in a future release.
   */
  async setWorkerDeploymentCurrentVersion(
    { namespace, deploymentName }: { namespace: string; deploymentName: string },
    body: components['schemas']['SetWorkerDeploymentCurrentVersionRequest'],
  ): Promise<
    import('./schemas/set-worker-deployment-current-version-response.ts').SetWorkerDeploymentCurrentVersionResponse
  > {
    const url = new URL(
      `/api/v1/namespaces/${namespace}/worker-deployments/${deploymentName}/set-current-version`,
      this.baseURL,
    );

    const request = new Request(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const response = await fetch(request);

    if (!response.ok) {
      throw new TemporalError(
        `${response.status}: setWorkerDeploymentCurrentVersion request failed.`,
        { request, response, operation: 'setWorkerDeploymentCurrentVersion' },
      );
    }

    return response.json();
  }

  /**
   * @description Set/unset the Ramping Version of a Worker Deployment and its ramp percentage. Can be used for
   *  gradual ramp to unversioned workers too.
   *  Experimental. This API might significantly change or be removed in a future release.
   */
  async setWorkerDeploymentRampingVersion(
    { namespace, deploymentName }: { namespace: string; deploymentName: string },
    body: components['schemas']['SetWorkerDeploymentRampingVersionRequest'],
  ): Promise<
    import('./schemas/set-worker-deployment-ramping-version-response.ts').SetWorkerDeploymentRampingVersionResponse
  > {
    const url = new URL(
      `/api/v1/namespaces/${namespace}/worker-deployments/${deploymentName}/set-ramping-version`,
      this.baseURL,
    );

    const request = new Request(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const response = await fetch(request);

    if (!response.ok) {
      throw new TemporalError(
        `${response.status}: setWorkerDeploymentRampingVersion request failed.`,
        { request, response, operation: 'setWorkerDeploymentRampingVersion' },
      );
    }

    return response.json();
  }

  /**
   * @description Deprecated. Use `DescribeTaskQueue`.
   *
   *  Fetches task reachability to determine whether a worker may be retired.
   *  The request may specify task queues to query for or let the server fetch all task queues mapped to the given
   *  build IDs.
   *
   *  When requesting a large number of task queues or all task queues associated with the given build ids in a
   *  namespace, all task queues will be listed in the response but some of them may not contain reachability
   *  information due to a server enforced limit. When reaching the limit, task queues that reachability information
   *  could not be retrieved for will be marked with a single TASK_REACHABILITY_UNSPECIFIED entry. The caller may issue
   *  another call to get the reachability for those task queues.
   *
   *  Open source users can adjust this limit by setting the server's dynamic config value for
   *  `limit.reachabilityTaskQueueScan` with the caveat that this call can strain the visibility store.
   */
  async getWorkerTaskReachability({
    buildIds,
    taskQueues,
    reachability,
    namespace,
  }: {
    buildIds?: readonly string[];
    taskQueues?: readonly string[];
    reachability?:
      | 'TASK_REACHABILITY_UNSPECIFIED'
      | 'TASK_REACHABILITY_NEW_WORKFLOWS'
      | 'TASK_REACHABILITY_EXISTING_WORKFLOWS'
      | 'TASK_REACHABILITY_OPEN_WORKFLOWS'
      | 'TASK_REACHABILITY_CLOSED_WORKFLOWS';
    namespace: string;
  }): Promise<
    import('./schemas/get-worker-task-reachability-response.ts').GetWorkerTaskReachabilityResponse
  > {
    const url = new URL(`/api/v1/namespaces/${namespace}/worker-task-reachability`, this.baseURL);

    if (buildIds) url.searchParams.append('buildIds', buildIds.join(','));

    if (taskQueues) url.searchParams.append('taskQueues', taskQueues.join(','));

    if (reachability) url.searchParams.append('reachability', reachability);

    const request = new Request(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    const response = await fetch(request);

    if (!response.ok) {
      throw new TemporalError(`${response.status}: getWorkerTaskReachability request failed.`, {
        request,
        response,
        operation: 'getWorkerTaskReachability',
      });
    }

    return response.json();
  }

  /** @description CountWorkflowExecutions is a visibility API to count of workflow executions in a specific namespace. */
  async countWorkflowExecutions({
    query,
    namespace,
  }: {
    query?: string;
    namespace: string;
  }): Promise<
    import('./schemas/count-workflow-executions-response.ts').CountWorkflowExecutionsResponse
  > {
    const url = new URL(`/api/v1/namespaces/${namespace}/workflow-count`, this.baseURL);

    if (query) url.searchParams.append('query', query);

    const request = new Request(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    const response = await fetch(request);

    if (!response.ok) {
      throw new TemporalError(`${response.status}: countWorkflowExecutions request failed.`, {
        request,
        response,
        operation: 'countWorkflowExecutions',
      });
    }

    return response.json();
  }

  /** @description ListWorkflowExecutions is a visibility API to list workflow executions in a specific namespace. */
  async listWorkflowExecutions({
    pageSize,
    nextPageToken,
    query,
    namespace,
  }: {
    pageSize?: number;
    nextPageToken?: string;
    query?: string;
    namespace: string;
  }): Promise<
    import('./schemas/list-workflow-executions-response.ts').ListWorkflowExecutionsResponse
  > {
    const url = new URL(`/api/v1/namespaces/${namespace}/workflows`, this.baseURL);

    if (pageSize) url.searchParams.append('pageSize', String(pageSize));

    if (nextPageToken) url.searchParams.append('nextPageToken', nextPageToken);

    if (query) url.searchParams.append('query', query);

    const request = new Request(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    const response = await fetch(request);

    if (!response.ok) {
      throw new TemporalError(`${response.status}: listWorkflowExecutions request failed.`, {
        request,
        response,
        operation: 'listWorkflowExecutions',
      });
    }

    return response.json();
  }

  /** @description DescribeWorkflowExecution returns information about the specified workflow execution. */
  async describeWorkflowExecution({
    executionWorkflowId,
    executionRunId,
    namespace,
    workflowId,
  }: {
    executionWorkflowId?: string;
    executionRunId?: string;
    namespace: string;
    workflowId: string;
  }): Promise<
    import('./schemas/describe-workflow-execution-response.ts').DescribeWorkflowExecutionResponse
  > {
    const url = new URL(`/api/v1/namespaces/${namespace}/workflows/${workflowId}`, this.baseURL);

    if (executionWorkflowId) url.searchParams.append('execution.workflowId', executionWorkflowId);

    if (executionRunId) url.searchParams.append('execution.runId', executionRunId);

    const request = new Request(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    const response = await fetch(request);

    if (!response.ok) {
      throw new TemporalError(`${response.status}: describeWorkflowExecution request failed.`, {
        request,
        response,
        operation: 'describeWorkflowExecution',
      });
    }

    return response.json();
  }

  /**
   * @description GetWorkflowExecutionHistory returns the history of specified workflow execution. Fails with
   *  `NotFound` if the specified workflow execution is unknown to the service.
   */
  async getWorkflowExecutionHistory({
    executionWorkflowId,
    executionRunId,
    maximumPageSize,
    nextPageToken,
    waitNewEvent,
    historyEventFilterType,
    skipArchival,
    namespace,
    workflowId,
  }: {
    executionWorkflowId?: string;
    executionRunId?: string;
    maximumPageSize?: number;
    nextPageToken?: string;
    waitNewEvent?: boolean;
    historyEventFilterType?:
      | 'HISTORY_EVENT_FILTER_TYPE_UNSPECIFIED'
      | 'HISTORY_EVENT_FILTER_TYPE_ALL_EVENT'
      | 'HISTORY_EVENT_FILTER_TYPE_CLOSE_EVENT';
    skipArchival?: boolean;
    namespace: string;
    workflowId: string;
  }): Promise<
    import('./schemas/get-workflow-execution-history-response.ts').GetWorkflowExecutionHistoryResponse
  > {
    const url = new URL(
      `/api/v1/namespaces/${namespace}/workflows/${workflowId}/history`,
      this.baseURL,
    );

    if (executionWorkflowId) url.searchParams.append('execution.workflowId', executionWorkflowId);

    if (executionRunId) url.searchParams.append('execution.runId', executionRunId);

    if (maximumPageSize) url.searchParams.append('maximumPageSize', String(maximumPageSize));

    if (nextPageToken) url.searchParams.append('nextPageToken', nextPageToken);

    if (waitNewEvent) url.searchParams.append('waitNewEvent', String(waitNewEvent));

    if (historyEventFilterType)
      url.searchParams.append('historyEventFilterType', historyEventFilterType);

    if (skipArchival) url.searchParams.append('skipArchival', String(skipArchival));

    const request = new Request(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    const response = await fetch(request);

    if (!response.ok) {
      throw new TemporalError(`${response.status}: getWorkflowExecutionHistory request failed.`, {
        request,
        response,
        operation: 'getWorkflowExecutionHistory',
      });
    }

    return response.json();
  }

  /**
   * @description GetWorkflowExecutionHistoryReverse returns the history of specified workflow execution in reverse
   *  order (starting from last event). Fails with`NotFound` if the specified workflow execution is
   *  unknown to the service.
   */
  async getWorkflowExecutionHistoryReverse({
    executionWorkflowId,
    executionRunId,
    maximumPageSize,
    nextPageToken,
    namespace,
    workflowId,
  }: {
    executionWorkflowId?: string;
    executionRunId?: string;
    maximumPageSize?: number;
    nextPageToken?: string;
    namespace: string;
    workflowId: string;
  }): Promise<
    import('./schemas/get-workflow-execution-history-reverse-response.ts').GetWorkflowExecutionHistoryReverseResponse
  > {
    const url = new URL(
      `/api/v1/namespaces/${namespace}/workflows/${workflowId}/history-reverse`,
      this.baseURL,
    );

    if (executionWorkflowId) url.searchParams.append('execution.workflowId', executionWorkflowId);

    if (executionRunId) url.searchParams.append('execution.runId', executionRunId);

    if (maximumPageSize) url.searchParams.append('maximumPageSize', String(maximumPageSize));

    if (nextPageToken) url.searchParams.append('nextPageToken', nextPageToken);

    const request = new Request(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    const response = await fetch(request);

    if (!response.ok) {
      throw new TemporalError(
        `${response.status}: getWorkflowExecutionHistoryReverse request failed.`,
        { request, response, operation: 'getWorkflowExecutionHistoryReverse' },
      );
    }

    return response.json();
  }

  /** @description QueryWorkflow requests a query be executed for a specified workflow execution. */
  async queryWorkflow(
    {
      namespace,
      workflowId,
      queryType,
    }: { namespace: string; workflowId: string; queryType: string },
    body: components['schemas']['QueryWorkflowRequest'],
  ): Promise<import('./schemas/query-workflow-response.ts').QueryWorkflowResponse> {
    const url = new URL(
      `/api/v1/namespaces/${namespace}/workflows/${workflowId}/query/${queryType}`,
      this.baseURL,
    );

    const request = new Request(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const response = await fetch(request);

    if (!response.ok) {
      throw new TemporalError(`${response.status}: queryWorkflow request failed.`, {
        request,
        response,
        operation: 'queryWorkflow',
      });
    }

    return response.json();
  }

  /**
   * @description RequestCancelWorkflowExecution is called by workers when they want to request cancellation of
   *  a workflow execution.
   *
   *  This results in a new `WORKFLOW_EXECUTION_CANCEL_REQUESTED` event being written to the
   *  workflow history and a new workflow task created for the workflow. It returns success if the requested
   *  workflow is already closed. It fails with 'NotFound' if the requested workflow doesn't exist.
   */
  async requestCancelWorkflowExecution(
    { namespace, workflowId }: { namespace: string; workflowId: string },
    body: components['schemas']['RequestCancelWorkflowExecutionRequest'],
  ): Promise<
    import('./schemas/request-cancel-workflow-execution-response.ts').RequestCancelWorkflowExecutionResponse
  > {
    const url = new URL(
      `/api/v1/namespaces/${namespace}/workflows/${workflowId}/cancel`,
      this.baseURL,
    );

    const request = new Request(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const response = await fetch(request);

    if (!response.ok) {
      throw new TemporalError(
        `${response.status}: requestCancelWorkflowExecution request failed.`,
        { request, response, operation: 'requestCancelWorkflowExecution' },
      );
    }

    return response.json();
  }

  /**
   * @description ResetWorkflowExecution will reset an existing workflow execution to a specified
   *  `WORKFLOW_TASK_COMPLETED` event (exclusive). It will immediately terminate the current
   *  execution instance.
   *  TODO: Does exclusive here mean *just* the completed event, or also WFT started? Otherwise the task is doomed to time out?
   */
  async resetWorkflowExecution(
    { namespace, workflowId }: { namespace: string; workflowId: string },
    body: components['schemas']['ResetWorkflowExecutionRequest'],
  ): Promise<
    import('./schemas/reset-workflow-execution-response.ts').ResetWorkflowExecutionResponse
  > {
    const url = new URL(
      `/api/v1/namespaces/${namespace}/workflows/${workflowId}/reset`,
      this.baseURL,
    );

    const request = new Request(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const response = await fetch(request);

    if (!response.ok) {
      throw new TemporalError(`${response.status}: resetWorkflowExecution request failed.`, {
        request,
        response,
        operation: 'resetWorkflowExecution',
      });
    }

    return response.json();
  }

  /**
   * @description SignalWorkflowExecution is used to send a signal to a running workflow execution.
   *
   *  This results in a `WORKFLOW_EXECUTION_SIGNALED` event recorded in the history and a workflow
   *  task being created for the execution.
   */
  async signalWorkflowExecution(
    {
      namespace,
      workflowId,
      signalName,
    }: { namespace: string; workflowId: string; signalName: string },
    body: components['schemas']['SignalWorkflowExecutionRequest'],
  ): Promise<
    import('./schemas/signal-workflow-execution-response.ts').SignalWorkflowExecutionResponse
  > {
    const url = new URL(
      `/api/v1/namespaces/${namespace}/workflows/${workflowId}/signal/${signalName}`,
      this.baseURL,
    );

    const request = new Request(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const response = await fetch(request);

    if (!response.ok) {
      throw new TemporalError(`${response.status}: signalWorkflowExecution request failed.`, {
        request,
        response,
        operation: 'signalWorkflowExecution',
      });
    }

    return response.json();
  }

  /**
   * @description TerminateWorkflowExecution terminates an existing workflow execution by recording a
   *  `WORKFLOW_EXECUTION_TERMINATED` event in the history and immediately terminating the
   *  execution instance.
   */
  async terminateWorkflowExecution(
    { namespace, workflowId }: { namespace: string; workflowId: string },
    body: components['schemas']['TerminateWorkflowExecutionRequest'],
  ): Promise<
    import('./schemas/terminate-workflow-execution-response.ts').TerminateWorkflowExecutionResponse
  > {
    const url = new URL(
      `/api/v1/namespaces/${namespace}/workflows/${workflowId}/terminate`,
      this.baseURL,
    );

    const request = new Request(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const response = await fetch(request);

    if (!response.ok) {
      throw new TemporalError(`${response.status}: terminateWorkflowExecution request failed.`, {
        request,
        response,
        operation: 'terminateWorkflowExecution',
      });
    }

    return response.json();
  }

  /** @description UpdateWorkflowExecutionOptions partially updates the WorkflowExecutionOptions of an existing workflow execution. */
  async updateWorkflowExecutionOptions(
    { namespace, workflowId }: { namespace: string; workflowId: string },
    body: components['schemas']['UpdateWorkflowExecutionOptionsRequest'],
  ): Promise<
    import('./schemas/update-workflow-execution-options-response.ts').UpdateWorkflowExecutionOptionsResponse
  > {
    const url = new URL(
      `/api/v1/namespaces/${namespace}/workflows/${workflowId}/update-options`,
      this.baseURL,
    );

    const request = new Request(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const response = await fetch(request);

    if (!response.ok) {
      throw new TemporalError(
        `${response.status}: updateWorkflowExecutionOptions request failed.`,
        { request, response, operation: 'updateWorkflowExecutionOptions' },
      );
    }

    return response.json();
  }

  /** @description Invokes the specified Update function on user Workflow code. */
  async updateWorkflowExecution(
    { namespace, workflowId, name }: { namespace: string; workflowId: string; name: string },
    body: components['schemas']['UpdateWorkflowExecutionRequest'],
  ): Promise<
    import('./schemas/update-workflow-execution-response.ts').UpdateWorkflowExecutionResponse
  > {
    const url = new URL(
      `/api/v1/namespaces/${namespace}/workflows/${workflowId}/update/${name}`,
      this.baseURL,
    );

    const request = new Request(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const response = await fetch(request);

    if (!response.ok) {
      throw new TemporalError(`${response.status}: updateWorkflowExecution request failed.`, {
        request,
        response,
        operation: 'updateWorkflowExecution',
      });
    }

    return response.json();
  }

  /**
   * @description StartWorkflowExecution starts a new workflow execution.
   *
   *  It will create the execution with a `WORKFLOW_EXECUTION_STARTED` event in its history and
   *  also schedule the first workflow task. Returns `WorkflowExecutionAlreadyStarted`, if an
   *  instance already exists with same workflow id.
   */
  async startWorkflowExecution(
    { namespace, workflowId }: { namespace: string; workflowId: string },
    body: components['schemas']['StartWorkflowExecutionRequest'],
  ): Promise<
    import('./schemas/start-workflow-execution-response.ts').StartWorkflowExecutionResponse
  > {
    const url = new URL(`/api/v1/namespaces/${namespace}/workflows/${workflowId}`, this.baseURL);

    const request = new Request(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const response = await fetch(request);

    if (!response.ok) {
      throw new TemporalError(`${response.status}: startWorkflowExecution request failed.`, {
        request,
        response,
        operation: 'startWorkflowExecution',
      });
    }

    return response.json();
  }

  /**
   * @description SignalWithStartWorkflowExecution is used to ensure a signal is sent to a workflow, even if
   *  it isn't yet started.
   *
   *  If the workflow is running, a `WORKFLOW_EXECUTION_SIGNALED` event is recorded in the history
   *  and a workflow task is generated.
   *
   *  If the workflow is not running or not found, then the workflow is created with
   *  `WORKFLOW_EXECUTION_STARTED` and `WORKFLOW_EXECUTION_SIGNALED` events in its history, and a
   *  workflow task is generated.
   *
   *  (-- api-linter: core::0136::prepositions=disabled
   *      aip.dev/not-precedent: "With" is used to indicate combined operation. --)
   */
  async signalWithStartWorkflowExecution(
    {
      namespace,
      workflowId,
      signalName,
    }: { namespace: string; workflowId: string; signalName: string },
    body: components['schemas']['SignalWithStartWorkflowExecutionRequest'],
  ): Promise<
    import('./schemas/signal-with-start-workflow-execution-response.ts').SignalWithStartWorkflowExecutionResponse
  > {
    const url = new URL(
      `/api/v1/namespaces/${namespace}/workflows/${workflowId}/signal-with-start/${signalName}`,
      this.baseURL,
    );

    const request = new Request(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const response = await fetch(request);

    if (!response.ok) {
      throw new TemporalError(
        `${response.status}: signalWithStartWorkflowExecution request failed.`,
        { request, response, operation: 'signalWithStartWorkflowExecution' },
      );
    }

    return response.json();
  }

  /**
   * @description ExecuteMultiOperation executes multiple operations within a single workflow.
   *
   *  Operations are started atomically, meaning if *any* operation fails to be started, none are,
   *  and the request fails. Upon start, the API returns only when *all* operations have a response.
   *
   *  Upon failure, it returns `MultiOperationExecutionFailure` where the status code
   *  equals the status code of the *first* operation that failed to be started.
   *
   *  NOTE: Experimental API.
   */
  async executeMultiOperation(
    { namespace }: { namespace: string },
    body: components['schemas']['ExecuteMultiOperationRequest'],
  ): Promise<
    import('./schemas/execute-multi-operation-response.ts').ExecuteMultiOperationResponse
  > {
    const url = new URL(
      `/api/v1/namespaces/${namespace}/workflows/execute-multi-operation`,
      this.baseURL,
    );

    const request = new Request(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const response = await fetch(request);

    if (!response.ok) {
      throw new TemporalError(`${response.status}: executeMultiOperation request failed.`, {
        request,
        response,
        operation: 'executeMultiOperation',
      });
    }

    return response.json();
  }

  /**
   * @description List all Nexus endpoints for the cluster, sorted by ID in ascending order. Set page_token in the request to the
   *  next_page_token field of the previous response to get the next page of results. An empty next_page_token
   *  indicates that there are no more results. During pagination, a newly added service with an ID lexicographically
   *  earlier than the previous page's last endpoint's ID may be missed.
   */
  async listNexusEndpoints({
    pageSize,
    nextPageToken,
    name,
  }: {
    pageSize?: number;
    nextPageToken?: string;
    name?: string;
  }): Promise<import('./schemas/list-nexus-endpoints-response.ts').ListNexusEndpointsResponse> {
    const url = new URL(`/api/v1/nexus/endpoints`, this.baseURL);

    if (pageSize) url.searchParams.append('pageSize', String(pageSize));

    if (nextPageToken) url.searchParams.append('nextPageToken', nextPageToken);

    if (name) url.searchParams.append('name', name);

    const request = new Request(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    const response = await fetch(request);

    if (!response.ok) {
      throw new TemporalError(`${response.status}: listNexusEndpoints request failed.`, {
        request,
        response,
        operation: 'listNexusEndpoints',
      });
    }

    return response.json();
  }

  /**
   * @description Create a Nexus endpoint. This will fail if an endpoint with the same name is already registered with a status of
   *  ALREADY_EXISTS.
   *  Returns the created endpoint with its initial version. You may use this version for subsequent updates.
   */
  async createNexusEndpoint(
    body: components['schemas']['CreateNexusEndpointRequest'],
  ): Promise<import('./schemas/create-nexus-endpoint-response.ts').CreateNexusEndpointResponse> {
    const url = new URL(`/api/v1/nexus/endpoints`, this.baseURL);

    const request = new Request(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const response = await fetch(request);

    if (!response.ok) {
      throw new TemporalError(`${response.status}: createNexusEndpoint request failed.`, {
        request,
        response,
        operation: 'createNexusEndpoint',
      });
    }

    return response.json();
  }

  /** @description Get a registered Nexus endpoint by ID. The returned version can be used for optimistic updates. */
  async getNexusEndpoint({
    id,
  }: {
    id: string;
  }): Promise<import('./schemas/get-nexus-endpoint-response.ts').GetNexusEndpointResponse> {
    const url = new URL(`/api/v1/nexus/endpoints/${id}`, this.baseURL);

    const request = new Request(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    const response = await fetch(request);

    if (!response.ok) {
      throw new TemporalError(`${response.status}: getNexusEndpoint request failed.`, {
        request,
        response,
        operation: 'getNexusEndpoint',
      });
    }

    return response.json();
  }

  /** @description Delete an incoming Nexus service by ID. */
  async deleteNexusEndpoint({
    version,
    id,
  }: {
    version?: string;
    id: string;
  }): Promise<import('./schemas/delete-nexus-endpoint-response.ts').DeleteNexusEndpointResponse> {
    const url = new URL(`/api/v1/nexus/endpoints/${id}`, this.baseURL);

    if (version) url.searchParams.append('version', version);

    const request = new Request(url, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });

    const response = await fetch(request);

    if (!response.ok) {
      throw new TemporalError(`${response.status}: deleteNexusEndpoint request failed.`, {
        request,
        response,
        operation: 'deleteNexusEndpoint',
      });
    }

    return response.json();
  }

  /**
   * @description Optimistically update a Nexus endpoint based on provided version as obtained via the `GetNexusEndpoint` or
   *  `ListNexusEndpointResponse` APIs. This will fail with a status of FAILED_PRECONDITION if the version does not
   *  match.
   *  Returns the updated endpoint with its updated version. You may use this version for subsequent updates. You don't
   *  need to increment the version yourself. The server will increment the version for you after each update.
   */
  async updateNexusEndpoint(
    { id }: { id: string },
    body: components['schemas']['UpdateNexusEndpointRequest'],
  ): Promise<import('./schemas/update-nexus-endpoint-response.ts').UpdateNexusEndpointResponse> {
    const url = new URL(`/api/v1/nexus/endpoints/${id}/update`, this.baseURL);

    const request = new Request(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const response = await fetch(request);

    if (!response.ok) {
      throw new TemporalError(`${response.status}: updateNexusEndpoint request failed.`, {
        request,
        response,
        operation: 'updateNexusEndpoint',
      });
    }

    return response.json();
  }

  /** @description GetSystemInfo returns information about the system. */
  async getSystemInfo(): Promise<
    import('./schemas/get-system-info-response.ts').GetSystemInfoResponse
  > {
    const url = new URL(`/api/v1/system-info`, this.baseURL);

    const request = new Request(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    const response = await fetch(request);

    if (!response.ok) {
      throw new TemporalError(`${response.status}: getSystemInfo request failed.`, {
        request,
        response,
        operation: 'getSystemInfo',
      });
    }

    return response.json();
  }
}

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
    import('./schemas/get-cluster-info-response').GetClusterInfoResponse
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

    try {
      const json = await response.json();
      const { GetClusterInfoResponse } = await import('./schemas/get-cluster-info-response');
      return GetClusterInfoResponse.parse(json);
    } catch (error) {
      throw new TemporalError(`Failed to parse response from getClusterInfo.`, {
        request,
        response,
        operation: 'getClusterInfo',
      });
    }
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
  }): Promise<import('./schemas/list-namespaces-response').ListNamespacesResponse> {
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

    try {
      const json = await response.json();
      const { ListNamespacesResponse } = await import('./schemas/list-namespaces-response');
      return ListNamespacesResponse.parse(json);
    } catch (error) {
      throw new TemporalError(`Failed to parse response from listNamespaces.`, {
        request,
        response,
        operation: 'listNamespaces',
      });
    }
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
  ): Promise<import('./schemas/register-namespace-response').RegisterNamespaceResponse> {
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

    try {
      const json = await response.json();
      const { RegisterNamespaceResponse } = await import('./schemas/register-namespace-response');
      return RegisterNamespaceResponse.parse(json);
    } catch (error) {
      throw new TemporalError(`Failed to parse response from registerNamespace.`, {
        request,
        response,
        operation: 'registerNamespace',
      });
    }
  }

  /** @description DescribeNamespace returns the information and configuration for a registered namespace. */
  async describeNamespace({
    id,
    namespace,
  }: {
    id?: string;
    namespace: string;
  }): Promise<import('./schemas/describe-namespace-response').DescribeNamespaceResponse> {
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

    try {
      const json = await response.json();
      const { DescribeNamespaceResponse } = await import('./schemas/describe-namespace-response');
      return DescribeNamespaceResponse.parse(json);
    } catch (error) {
      throw new TemporalError(`Failed to parse response from describeNamespace.`, {
        request,
        response,
        operation: 'describeNamespace',
      });
    }
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
    import('./schemas/respond-activity-task-canceled-response').RespondActivityTaskCanceledResponse
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

    try {
      const json = await response.json();
      const { RespondActivityTaskCanceledResponse } = await import(
        './schemas/respond-activity-task-canceled-response'
      );
      return RespondActivityTaskCanceledResponse.parse(json);
    } catch (error) {
      throw new TemporalError(`Failed to parse response from respondActivityTaskCanceled.`, {
        request,
        response,
        operation: 'respondActivityTaskCanceled',
      });
    }
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
    import('./schemas/respond-activity-task-canceled-by-id-response').RespondActivityTaskCanceledByIdResponse
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

    try {
      const json = await response.json();
      const { RespondActivityTaskCanceledByIdResponse } = await import(
        './schemas/respond-activity-task-canceled-by-id-response'
      );
      return RespondActivityTaskCanceledByIdResponse.parse(json);
    } catch (error) {
      throw new TemporalError(`Failed to parse response from respondActivityTaskCanceledById.`, {
        request,
        response,
        operation: 'respondActivityTaskCanceledById',
      });
    }
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
    import('./schemas/respond-activity-task-completed-response').RespondActivityTaskCompletedResponse
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

    try {
      const json = await response.json();
      const { RespondActivityTaskCompletedResponse } = await import(
        './schemas/respond-activity-task-completed-response'
      );
      return RespondActivityTaskCompletedResponse.parse(json);
    } catch (error) {
      throw new TemporalError(`Failed to parse response from respondActivityTaskCompleted.`, {
        request,
        response,
        operation: 'respondActivityTaskCompleted',
      });
    }
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
    import('./schemas/respond-activity-task-completed-by-id-response').RespondActivityTaskCompletedByIdResponse
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

    try {
      const json = await response.json();
      const { RespondActivityTaskCompletedByIdResponse } = await import(
        './schemas/respond-activity-task-completed-by-id-response'
      );
      return RespondActivityTaskCompletedByIdResponse.parse(json);
    } catch (error) {
      throw new TemporalError(`Failed to parse response from respondActivityTaskCompletedById.`, {
        request,
        response,
        operation: 'respondActivityTaskCompletedById',
      });
    }
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
    import('./schemas/respond-activity-task-failed-response').RespondActivityTaskFailedResponse
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

    try {
      const json = await response.json();
      const { RespondActivityTaskFailedResponse } = await import(
        './schemas/respond-activity-task-failed-response'
      );
      return RespondActivityTaskFailedResponse.parse(json);
    } catch (error) {
      throw new TemporalError(`Failed to parse response from respondActivityTaskFailed.`, {
        request,
        response,
        operation: 'respondActivityTaskFailed',
      });
    }
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
    import('./schemas/respond-activity-task-failed-by-id-response').RespondActivityTaskFailedByIdResponse
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

    try {
      const json = await response.json();
      const { RespondActivityTaskFailedByIdResponse } = await import(
        './schemas/respond-activity-task-failed-by-id-response'
      );
      return RespondActivityTaskFailedByIdResponse.parse(json);
    } catch (error) {
      throw new TemporalError(`Failed to parse response from respondActivityTaskFailedById.`, {
        request,
        response,
        operation: 'respondActivityTaskFailedById',
      });
    }
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
    import('./schemas/record-activity-task-heartbeat-response').RecordActivityTaskHeartbeatResponse
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

    try {
      const json = await response.json();
      const { RecordActivityTaskHeartbeatResponse } = await import(
        './schemas/record-activity-task-heartbeat-response'
      );
      return RecordActivityTaskHeartbeatResponse.parse(json);
    } catch (error) {
      throw new TemporalError(`Failed to parse response from recordActivityTaskHeartbeat.`, {
        request,
        response,
        operation: 'recordActivityTaskHeartbeat',
      });
    }
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
    import('./schemas/record-activity-task-heartbeat-by-id-response').RecordActivityTaskHeartbeatByIdResponse
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

    try {
      const json = await response.json();
      const { RecordActivityTaskHeartbeatByIdResponse } = await import(
        './schemas/record-activity-task-heartbeat-by-id-response'
      );
      return RecordActivityTaskHeartbeatByIdResponse.parse(json);
    } catch (error) {
      throw new TemporalError(`Failed to parse response from recordActivityTaskHeartbeatById.`, {
        request,
        response,
        operation: 'recordActivityTaskHeartbeatById',
      });
    }
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
  ): Promise<import('./schemas/pause-activity-response').PauseActivityResponse> {
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

    try {
      const json = await response.json();
      const { PauseActivityResponse } = await import('./schemas/pause-activity-response');
      return PauseActivityResponse.parse(json);
    } catch (error) {
      throw new TemporalError(`Failed to parse response from pauseActivity.`, {
        request,
        response,
        operation: 'pauseActivity',
      });
    }
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
  ): Promise<import('./schemas/reset-activity-response').ResetActivityResponse> {
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

    try {
      const json = await response.json();
      const { ResetActivityResponse } = await import('./schemas/reset-activity-response');
      return ResetActivityResponse.parse(json);
    } catch (error) {
      throw new TemporalError(`Failed to parse response from resetActivity.`, {
        request,
        response,
        operation: 'resetActivity',
      });
    }
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
  ): Promise<import('./schemas/unpause-activity-response').UnpauseActivityResponse> {
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

    try {
      const json = await response.json();
      const { UnpauseActivityResponse } = await import('./schemas/unpause-activity-response');
      return UnpauseActivityResponse.parse(json);
    } catch (error) {
      throw new TemporalError(`Failed to parse response from unpauseActivity.`, {
        request,
        response,
        operation: 'unpauseActivity',
      });
    }
  }

  /**
   * @description UpdateActivityOptions is called by the client to update the options of an activity by its ID or type.
   *  If there are multiple pending activities of the provided type - all of them will be updated.
   */
  async updateActivityOptions(
    { namespace }: { namespace: string },
    body: components['schemas']['UpdateActivityOptionsRequest'],
  ): Promise<import('./schemas/update-activity-options-response').UpdateActivityOptionsResponse> {
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

    try {
      const json = await response.json();
      const { UpdateActivityOptionsResponse } = await import(
        './schemas/update-activity-options-response'
      );
      return UpdateActivityOptionsResponse.parse(json);
    } catch (error) {
      throw new TemporalError(`Failed to parse response from updateActivityOptions.`, {
        request,
        response,
        operation: 'updateActivityOptions',
      });
    }
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
    import('./schemas/list-archived-workflow-executions-response').ListArchivedWorkflowExecutionsResponse
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

    try {
      const json = await response.json();
      const { ListArchivedWorkflowExecutionsResponse } = await import(
        './schemas/list-archived-workflow-executions-response'
      );
      return ListArchivedWorkflowExecutionsResponse.parse(json);
    } catch (error) {
      throw new TemporalError(`Failed to parse response from listArchivedWorkflowExecutions.`, {
        request,
        response,
        operation: 'listArchivedWorkflowExecutions',
      });
    }
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
  }): Promise<import('./schemas/list-batch-operations-response').ListBatchOperationsResponse> {
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

    try {
      const json = await response.json();
      const { ListBatchOperationsResponse } = await import(
        './schemas/list-batch-operations-response'
      );
      return ListBatchOperationsResponse.parse(json);
    } catch (error) {
      throw new TemporalError(`Failed to parse response from listBatchOperations.`, {
        request,
        response,
        operation: 'listBatchOperations',
      });
    }
  }

  /** @description DescribeBatchOperation returns the information about a batch operation */
  async describeBatchOperation({
    namespace,
    jobId,
  }: {
    namespace: string;
    jobId: string;
  }): Promise<
    import('./schemas/describe-batch-operation-response').DescribeBatchOperationResponse
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

    try {
      const json = await response.json();
      const { DescribeBatchOperationResponse } = await import(
        './schemas/describe-batch-operation-response'
      );
      return DescribeBatchOperationResponse.parse(json);
    } catch (error) {
      throw new TemporalError(`Failed to parse response from describeBatchOperation.`, {
        request,
        response,
        operation: 'describeBatchOperation',
      });
    }
  }

  /** @description StartBatchOperation starts a new batch operation */
  async startBatchOperation(
    { namespace, jobId }: { namespace: string; jobId: string },
    body: components['schemas']['StartBatchOperationRequest'],
  ): Promise<import('./schemas/start-batch-operation-response').StartBatchOperationResponse> {
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

    try {
      const json = await response.json();
      const { StartBatchOperationResponse } = await import(
        './schemas/start-batch-operation-response'
      );
      return StartBatchOperationResponse.parse(json);
    } catch (error) {
      throw new TemporalError(`Failed to parse response from startBatchOperation.`, {
        request,
        response,
        operation: 'startBatchOperation',
      });
    }
  }

  /** @description StopBatchOperation stops a batch operation */
  async stopBatchOperation(
    { namespace, jobId }: { namespace: string; jobId: string },
    body: components['schemas']['StopBatchOperationRequest'],
  ): Promise<import('./schemas/stop-batch-operation-response').StopBatchOperationResponse> {
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

    try {
      const json = await response.json();
      const { StopBatchOperationResponse } = await import(
        './schemas/stop-batch-operation-response'
      );
      return StopBatchOperationResponse.parse(json);
    } catch (error) {
      throw new TemporalError(`Failed to parse response from stopBatchOperation.`, {
        request,
        response,
        operation: 'stopBatchOperation',
      });
    }
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
  ): Promise<import('./schemas/set-current-deployment-response').SetCurrentDeploymentResponse> {
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

    try {
      const json = await response.json();
      const { SetCurrentDeploymentResponse } = await import(
        './schemas/set-current-deployment-response'
      );
      return SetCurrentDeploymentResponse.parse(json);
    } catch (error) {
      throw new TemporalError(`Failed to parse response from setCurrentDeployment.`, {
        request,
        response,
        operation: 'setCurrentDeployment',
      });
    }
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
  }): Promise<import('./schemas/get-current-deployment-response').GetCurrentDeploymentResponse> {
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

    try {
      const json = await response.json();
      const { GetCurrentDeploymentResponse } = await import(
        './schemas/get-current-deployment-response'
      );
      return GetCurrentDeploymentResponse.parse(json);
    } catch (error) {
      throw new TemporalError(`Failed to parse response from getCurrentDeployment.`, {
        request,
        response,
        operation: 'getCurrentDeployment',
      });
    }
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
  }): Promise<import('./schemas/list-deployments-response').ListDeploymentsResponse> {
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

    try {
      const json = await response.json();
      const { ListDeploymentsResponse } = await import('./schemas/list-deployments-response');
      return ListDeploymentsResponse.parse(json);
    } catch (error) {
      throw new TemporalError(`Failed to parse response from listDeployments.`, {
        request,
        response,
        operation: 'listDeployments',
      });
    }
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
  }): Promise<import('./schemas/describe-deployment-response').DescribeDeploymentResponse> {
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

    try {
      const json = await response.json();
      const { DescribeDeploymentResponse } = await import('./schemas/describe-deployment-response');
      return DescribeDeploymentResponse.parse(json);
    } catch (error) {
      throw new TemporalError(`Failed to parse response from describeDeployment.`, {
        request,
        response,
        operation: 'describeDeployment',
      });
    }
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
    import('./schemas/get-deployment-reachability-response').GetDeploymentReachabilityResponse
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

    try {
      const json = await response.json();
      const { GetDeploymentReachabilityResponse } = await import(
        './schemas/get-deployment-reachability-response'
      );
      return GetDeploymentReachabilityResponse.parse(json);
    } catch (error) {
      throw new TemporalError(`Failed to parse response from getDeploymentReachability.`, {
        request,
        response,
        operation: 'getDeploymentReachability',
      });
    }
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
  }): Promise<import('./schemas/list-schedules-response').ListSchedulesResponse> {
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

    try {
      const json = await response.json();
      const { ListSchedulesResponse } = await import('./schemas/list-schedules-response');
      return ListSchedulesResponse.parse(json);
    } catch (error) {
      throw new TemporalError(`Failed to parse response from listSchedules.`, {
        request,
        response,
        operation: 'listSchedules',
      });
    }
  }

  /** @description Returns the schedule description and current state of an existing schedule. */
  async describeSchedule({
    namespace,
    scheduleId,
  }: {
    namespace: string;
    scheduleId: string;
  }): Promise<import('./schemas/describe-schedule-response').DescribeScheduleResponse> {
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

    try {
      const json = await response.json();
      const { DescribeScheduleResponse } = await import('./schemas/describe-schedule-response');
      return DescribeScheduleResponse.parse(json);
    } catch (error) {
      throw new TemporalError(`Failed to parse response from describeSchedule.`, {
        request,
        response,
        operation: 'describeSchedule',
      });
    }
  }

  /** @description Creates a new schedule. */
  async createSchedule(
    { namespace, scheduleId }: { namespace: string; scheduleId: string },
    body: components['schemas']['CreateScheduleRequest'],
  ): Promise<import('./schemas/create-schedule-response').CreateScheduleResponse> {
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

    try {
      const json = await response.json();
      const { CreateScheduleResponse } = await import('./schemas/create-schedule-response');
      return CreateScheduleResponse.parse(json);
    } catch (error) {
      throw new TemporalError(`Failed to parse response from createSchedule.`, {
        request,
        response,
        operation: 'createSchedule',
      });
    }
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
  }): Promise<import('./schemas/delete-schedule-response').DeleteScheduleResponse> {
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

    try {
      const json = await response.json();
      const { DeleteScheduleResponse } = await import('./schemas/delete-schedule-response');
      return DeleteScheduleResponse.parse(json);
    } catch (error) {
      throw new TemporalError(`Failed to parse response from deleteSchedule.`, {
        request,
        response,
        operation: 'deleteSchedule',
      });
    }
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
    import('./schemas/list-schedule-matching-times-response').ListScheduleMatchingTimesResponse
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

    try {
      const json = await response.json();
      const { ListScheduleMatchingTimesResponse } = await import(
        './schemas/list-schedule-matching-times-response'
      );
      return ListScheduleMatchingTimesResponse.parse(json);
    } catch (error) {
      throw new TemporalError(`Failed to parse response from listScheduleMatchingTimes.`, {
        request,
        response,
        operation: 'listScheduleMatchingTimes',
      });
    }
  }

  /** @description Makes a specific change to a schedule or triggers an immediate action. */
  async patchSchedule(
    { namespace, scheduleId }: { namespace: string; scheduleId: string },
    body: components['schemas']['PatchScheduleRequest'],
  ): Promise<import('./schemas/patch-schedule-response').PatchScheduleResponse> {
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

    try {
      const json = await response.json();
      const { PatchScheduleResponse } = await import('./schemas/patch-schedule-response');
      return PatchScheduleResponse.parse(json);
    } catch (error) {
      throw new TemporalError(`Failed to parse response from patchSchedule.`, {
        request,
        response,
        operation: 'patchSchedule',
      });
    }
  }

  /** @description Changes the configuration or state of an existing schedule. */
  async updateSchedule(
    { namespace, scheduleId }: { namespace: string; scheduleId: string },
    body: components['schemas']['UpdateScheduleRequest'],
  ): Promise<import('./schemas/update-schedule-response').UpdateScheduleResponse> {
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

    try {
      const json = await response.json();
      const { UpdateScheduleResponse } = await import('./schemas/update-schedule-response');
      return UpdateScheduleResponse.parse(json);
    } catch (error) {
      throw new TemporalError(`Failed to parse response from updateSchedule.`, {
        request,
        response,
        operation: 'updateSchedule',
      });
    }
  }

  /** @description ListSearchAttributes returns comprehensive information about search attributes. */
  async listSearchAttributes({
    namespace,
  }: {
    namespace: string;
  }): Promise<import('./schemas/list-search-attributes-response').ListSearchAttributesResponse> {
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

    try {
      const json = await response.json();
      const { ListSearchAttributesResponse } = await import(
        './schemas/list-search-attributes-response'
      );
      return ListSearchAttributesResponse.parse(json);
    } catch (error) {
      throw new TemporalError(`Failed to parse response from listSearchAttributes.`, {
        request,
        response,
        operation: 'listSearchAttributes',
      });
    }
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
  }): Promise<import('./schemas/describe-task-queue-response').DescribeTaskQueueResponse> {
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

    try {
      const json = await response.json();
      const { DescribeTaskQueueResponse } = await import('./schemas/describe-task-queue-response');
      return DescribeTaskQueueResponse.parse(json);
    } catch (error) {
      throw new TemporalError(`Failed to parse response from describeTaskQueue.`, {
        request,
        response,
        operation: 'describeTaskQueue',
      });
    }
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
    import('./schemas/get-worker-build-id-compatibility-response').GetWorkerBuildIdCompatibilityResponse
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

    try {
      const json = await response.json();
      const { GetWorkerBuildIdCompatibilityResponse } = await import(
        './schemas/get-worker-build-id-compatibility-response'
      );
      return GetWorkerBuildIdCompatibilityResponse.parse(json);
    } catch (error) {
      throw new TemporalError(`Failed to parse response from getWorkerBuildIdCompatibility.`, {
        request,
        response,
        operation: 'getWorkerBuildIdCompatibility',
      });
    }
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
    import('./schemas/get-worker-versioning-rules-response').GetWorkerVersioningRulesResponse
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

    try {
      const json = await response.json();
      const { GetWorkerVersioningRulesResponse } = await import(
        './schemas/get-worker-versioning-rules-response'
      );
      return GetWorkerVersioningRulesResponse.parse(json);
    } catch (error) {
      throw new TemporalError(`Failed to parse response from getWorkerVersioningRules.`, {
        request,
        response,
        operation: 'getWorkerVersioningRules',
      });
    }
  }

  /**
   * @description UpdateNamespace is used to update the information and configuration of a registered
   *  namespace.
   */
  async updateNamespace(
    { namespace }: { namespace: string },
    body: components['schemas']['UpdateNamespaceRequest'],
  ): Promise<import('./schemas/update-namespace-response').UpdateNamespaceResponse> {
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

    try {
      const json = await response.json();
      const { UpdateNamespaceResponse } = await import('./schemas/update-namespace-response');
      return UpdateNamespaceResponse.parse(json);
    } catch (error) {
      throw new TemporalError(`Failed to parse response from updateNamespace.`, {
        request,
        response,
        operation: 'updateNamespace',
      });
    }
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
    import('./schemas/describe-worker-deployment-version-response').DescribeWorkerDeploymentVersionResponse
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

    try {
      const json = await response.json();
      const { DescribeWorkerDeploymentVersionResponse } = await import(
        './schemas/describe-worker-deployment-version-response'
      );
      return DescribeWorkerDeploymentVersionResponse.parse(json);
    } catch (error) {
      throw new TemporalError(`Failed to parse response from describeWorkerDeploymentVersion.`, {
        request,
        response,
        operation: 'describeWorkerDeploymentVersion',
      });
    }
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
    import('./schemas/delete-worker-deployment-version-response').DeleteWorkerDeploymentVersionResponse
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

    try {
      const json = await response.json();
      const { DeleteWorkerDeploymentVersionResponse } = await import(
        './schemas/delete-worker-deployment-version-response'
      );
      return DeleteWorkerDeploymentVersionResponse.parse(json);
    } catch (error) {
      throw new TemporalError(`Failed to parse response from deleteWorkerDeploymentVersion.`, {
        request,
        response,
        operation: 'deleteWorkerDeploymentVersion',
      });
    }
  }

  /**
   * @description Updates the user-given metadata attached to a Worker Deployment Version.
   *  Experimental. This API might significantly change or be removed in a future release.
   */
  async updateWorkerDeploymentVersionMetadata(
    { namespace, version }: { namespace: string; version: string },
    body: components['schemas']['UpdateWorkerDeploymentVersionMetadataRequest'],
  ): Promise<
    import('./schemas/update-worker-deployment-version-metadata-response').UpdateWorkerDeploymentVersionMetadataResponse
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

    try {
      const json = await response.json();
      const { UpdateWorkerDeploymentVersionMetadataResponse } = await import(
        './schemas/update-worker-deployment-version-metadata-response'
      );
      return UpdateWorkerDeploymentVersionMetadataResponse.parse(json);
    } catch (error) {
      throw new TemporalError(
        `Failed to parse response from updateWorkerDeploymentVersionMetadata.`,
        { request, response, operation: 'updateWorkerDeploymentVersionMetadata' },
      );
    }
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
  }): Promise<import('./schemas/list-worker-deployments-response').ListWorkerDeploymentsResponse> {
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

    try {
      const json = await response.json();
      const { ListWorkerDeploymentsResponse } = await import(
        './schemas/list-worker-deployments-response'
      );
      return ListWorkerDeploymentsResponse.parse(json);
    } catch (error) {
      throw new TemporalError(`Failed to parse response from listWorkerDeployments.`, {
        request,
        response,
        operation: 'listWorkerDeployments',
      });
    }
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
    import('./schemas/describe-worker-deployment-response').DescribeWorkerDeploymentResponse
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

    try {
      const json = await response.json();
      const { DescribeWorkerDeploymentResponse } = await import(
        './schemas/describe-worker-deployment-response'
      );
      return DescribeWorkerDeploymentResponse.parse(json);
    } catch (error) {
      throw new TemporalError(`Failed to parse response from describeWorkerDeployment.`, {
        request,
        response,
        operation: 'describeWorkerDeployment',
      });
    }
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
    import('./schemas/delete-worker-deployment-response').DeleteWorkerDeploymentResponse
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

    try {
      const json = await response.json();
      const { DeleteWorkerDeploymentResponse } = await import(
        './schemas/delete-worker-deployment-response'
      );
      return DeleteWorkerDeploymentResponse.parse(json);
    } catch (error) {
      throw new TemporalError(`Failed to parse response from deleteWorkerDeployment.`, {
        request,
        response,
        operation: 'deleteWorkerDeployment',
      });
    }
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
    import('./schemas/set-worker-deployment-current-version-response').SetWorkerDeploymentCurrentVersionResponse
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

    try {
      const json = await response.json();
      const { SetWorkerDeploymentCurrentVersionResponse } = await import(
        './schemas/set-worker-deployment-current-version-response'
      );
      return SetWorkerDeploymentCurrentVersionResponse.parse(json);
    } catch (error) {
      throw new TemporalError(`Failed to parse response from setWorkerDeploymentCurrentVersion.`, {
        request,
        response,
        operation: 'setWorkerDeploymentCurrentVersion',
      });
    }
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
    import('./schemas/set-worker-deployment-ramping-version-response').SetWorkerDeploymentRampingVersionResponse
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

    try {
      const json = await response.json();
      const { SetWorkerDeploymentRampingVersionResponse } = await import(
        './schemas/set-worker-deployment-ramping-version-response'
      );
      return SetWorkerDeploymentRampingVersionResponse.parse(json);
    } catch (error) {
      throw new TemporalError(`Failed to parse response from setWorkerDeploymentRampingVersion.`, {
        request,
        response,
        operation: 'setWorkerDeploymentRampingVersion',
      });
    }
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
    import('./schemas/get-worker-task-reachability-response').GetWorkerTaskReachabilityResponse
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

    try {
      const json = await response.json();
      const { GetWorkerTaskReachabilityResponse } = await import(
        './schemas/get-worker-task-reachability-response'
      );
      return GetWorkerTaskReachabilityResponse.parse(json);
    } catch (error) {
      throw new TemporalError(`Failed to parse response from getWorkerTaskReachability.`, {
        request,
        response,
        operation: 'getWorkerTaskReachability',
      });
    }
  }

  /** @description CountWorkflowExecutions is a visibility API to count of workflow executions in a specific namespace. */
  async countWorkflowExecutions({
    query,
    namespace,
  }: {
    query?: string;
    namespace: string;
  }): Promise<
    import('./schemas/count-workflow-executions-response').CountWorkflowExecutionsResponse
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

    try {
      const json = await response.json();
      const { CountWorkflowExecutionsResponse } = await import(
        './schemas/count-workflow-executions-response'
      );
      return CountWorkflowExecutionsResponse.parse(json);
    } catch (error) {
      throw new TemporalError(`Failed to parse response from countWorkflowExecutions.`, {
        request,
        response,
        operation: 'countWorkflowExecutions',
      });
    }
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
    import('./schemas/list-workflow-executions-response').ListWorkflowExecutionsResponse
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

    try {
      const json = await response.json();
      const { ListWorkflowExecutionsResponse } = await import(
        './schemas/list-workflow-executions-response'
      );
      return ListWorkflowExecutionsResponse.parse(json);
    } catch (error) {
      throw new TemporalError(`Failed to parse response from listWorkflowExecutions.`, {
        request,
        response,
        operation: 'listWorkflowExecutions',
      });
    }
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
    import('./schemas/describe-workflow-execution-response').DescribeWorkflowExecutionResponse
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

    try {
      const json = await response.json();
      const { DescribeWorkflowExecutionResponse } = await import(
        './schemas/describe-workflow-execution-response'
      );
      return DescribeWorkflowExecutionResponse.parse(json);
    } catch (error) {
      throw new TemporalError(`Failed to parse response from describeWorkflowExecution.`, {
        request,
        response,
        operation: 'describeWorkflowExecution',
      });
    }
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
    import('./schemas/get-workflow-execution-history-response').GetWorkflowExecutionHistoryResponse
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

    try {
      const json = await response.json();
      const { GetWorkflowExecutionHistoryResponse } = await import(
        './schemas/get-workflow-execution-history-response'
      );
      return GetWorkflowExecutionHistoryResponse.parse(json);
    } catch (error) {
      throw new TemporalError(`Failed to parse response from getWorkflowExecutionHistory.`, {
        request,
        response,
        operation: 'getWorkflowExecutionHistory',
      });
    }
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
    import('./schemas/get-workflow-execution-history-reverse-response').GetWorkflowExecutionHistoryReverseResponse
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

    try {
      const json = await response.json();
      const { GetWorkflowExecutionHistoryReverseResponse } = await import(
        './schemas/get-workflow-execution-history-reverse-response'
      );
      return GetWorkflowExecutionHistoryReverseResponse.parse(json);
    } catch (error) {
      throw new TemporalError(`Failed to parse response from getWorkflowExecutionHistoryReverse.`, {
        request,
        response,
        operation: 'getWorkflowExecutionHistoryReverse',
      });
    }
  }

  /** @description QueryWorkflow requests a query be executed for a specified workflow execution. */
  async queryWorkflow(
    {
      namespace,
      workflowId,
      queryType,
    }: { namespace: string; workflowId: string; queryType: string },
    body: components['schemas']['QueryWorkflowRequest'],
  ): Promise<import('./schemas/query-workflow-response').QueryWorkflowResponse> {
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

    try {
      const json = await response.json();
      const { QueryWorkflowResponse } = await import('./schemas/query-workflow-response');
      return QueryWorkflowResponse.parse(json);
    } catch (error) {
      throw new TemporalError(`Failed to parse response from queryWorkflow.`, {
        request,
        response,
        operation: 'queryWorkflow',
      });
    }
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
    import('./schemas/request-cancel-workflow-execution-response').RequestCancelWorkflowExecutionResponse
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

    try {
      const json = await response.json();
      const { RequestCancelWorkflowExecutionResponse } = await import(
        './schemas/request-cancel-workflow-execution-response'
      );
      return RequestCancelWorkflowExecutionResponse.parse(json);
    } catch (error) {
      throw new TemporalError(`Failed to parse response from requestCancelWorkflowExecution.`, {
        request,
        response,
        operation: 'requestCancelWorkflowExecution',
      });
    }
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
  ): Promise<import('./schemas/reset-workflow-execution-response').ResetWorkflowExecutionResponse> {
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

    try {
      const json = await response.json();
      const { ResetWorkflowExecutionResponse } = await import(
        './schemas/reset-workflow-execution-response'
      );
      return ResetWorkflowExecutionResponse.parse(json);
    } catch (error) {
      throw new TemporalError(`Failed to parse response from resetWorkflowExecution.`, {
        request,
        response,
        operation: 'resetWorkflowExecution',
      });
    }
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
    import('./schemas/signal-workflow-execution-response').SignalWorkflowExecutionResponse
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

    try {
      const json = await response.json();
      const { SignalWorkflowExecutionResponse } = await import(
        './schemas/signal-workflow-execution-response'
      );
      return SignalWorkflowExecutionResponse.parse(json);
    } catch (error) {
      throw new TemporalError(`Failed to parse response from signalWorkflowExecution.`, {
        request,
        response,
        operation: 'signalWorkflowExecution',
      });
    }
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
    import('./schemas/terminate-workflow-execution-response').TerminateWorkflowExecutionResponse
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

    try {
      const json = await response.json();
      const { TerminateWorkflowExecutionResponse } = await import(
        './schemas/terminate-workflow-execution-response'
      );
      return TerminateWorkflowExecutionResponse.parse(json);
    } catch (error) {
      throw new TemporalError(`Failed to parse response from terminateWorkflowExecution.`, {
        request,
        response,
        operation: 'terminateWorkflowExecution',
      });
    }
  }

  /** @description UpdateWorkflowExecutionOptions partially updates the WorkflowExecutionOptions of an existing workflow execution. */
  async updateWorkflowExecutionOptions(
    { namespace, workflowId }: { namespace: string; workflowId: string },
    body: components['schemas']['UpdateWorkflowExecutionOptionsRequest'],
  ): Promise<
    import('./schemas/update-workflow-execution-options-response').UpdateWorkflowExecutionOptionsResponse
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

    try {
      const json = await response.json();
      const { UpdateWorkflowExecutionOptionsResponse } = await import(
        './schemas/update-workflow-execution-options-response'
      );
      return UpdateWorkflowExecutionOptionsResponse.parse(json);
    } catch (error) {
      throw new TemporalError(`Failed to parse response from updateWorkflowExecutionOptions.`, {
        request,
        response,
        operation: 'updateWorkflowExecutionOptions',
      });
    }
  }

  /** @description Invokes the specified Update function on user Workflow code. */
  async updateWorkflowExecution(
    { namespace, workflowId, name }: { namespace: string; workflowId: string; name: string },
    body: components['schemas']['UpdateWorkflowExecutionRequest'],
  ): Promise<
    import('./schemas/update-workflow-execution-response').UpdateWorkflowExecutionResponse
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

    try {
      const json = await response.json();
      const { UpdateWorkflowExecutionResponse } = await import(
        './schemas/update-workflow-execution-response'
      );
      return UpdateWorkflowExecutionResponse.parse(json);
    } catch (error) {
      throw new TemporalError(`Failed to parse response from updateWorkflowExecution.`, {
        request,
        response,
        operation: 'updateWorkflowExecution',
      });
    }
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
  ): Promise<import('./schemas/start-workflow-execution-response').StartWorkflowExecutionResponse> {
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

    try {
      const json = await response.json();
      const { StartWorkflowExecutionResponse } = await import(
        './schemas/start-workflow-execution-response'
      );
      return StartWorkflowExecutionResponse.parse(json);
    } catch (error) {
      throw new TemporalError(`Failed to parse response from startWorkflowExecution.`, {
        request,
        response,
        operation: 'startWorkflowExecution',
      });
    }
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
    import('./schemas/signal-with-start-workflow-execution-response').SignalWithStartWorkflowExecutionResponse
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

    try {
      const json = await response.json();
      const { SignalWithStartWorkflowExecutionResponse } = await import(
        './schemas/signal-with-start-workflow-execution-response'
      );
      return SignalWithStartWorkflowExecutionResponse.parse(json);
    } catch (error) {
      throw new TemporalError(`Failed to parse response from signalWithStartWorkflowExecution.`, {
        request,
        response,
        operation: 'signalWithStartWorkflowExecution',
      });
    }
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
  ): Promise<import('./schemas/execute-multi-operation-response').ExecuteMultiOperationResponse> {
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

    try {
      const json = await response.json();
      const { ExecuteMultiOperationResponse } = await import(
        './schemas/execute-multi-operation-response'
      );
      return ExecuteMultiOperationResponse.parse(json);
    } catch (error) {
      throw new TemporalError(`Failed to parse response from executeMultiOperation.`, {
        request,
        response,
        operation: 'executeMultiOperation',
      });
    }
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
  }): Promise<import('./schemas/list-nexus-endpoints-response').ListNexusEndpointsResponse> {
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

    try {
      const json = await response.json();
      const { ListNexusEndpointsResponse } = await import(
        './schemas/list-nexus-endpoints-response'
      );
      return ListNexusEndpointsResponse.parse(json);
    } catch (error) {
      throw new TemporalError(`Failed to parse response from listNexusEndpoints.`, {
        request,
        response,
        operation: 'listNexusEndpoints',
      });
    }
  }

  /**
   * @description Create a Nexus endpoint. This will fail if an endpoint with the same name is already registered with a status of
   *  ALREADY_EXISTS.
   *  Returns the created endpoint with its initial version. You may use this version for subsequent updates.
   */
  async createNexusEndpoint(
    body: components['schemas']['CreateNexusEndpointRequest'],
  ): Promise<import('./schemas/create-nexus-endpoint-response').CreateNexusEndpointResponse> {
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

    try {
      const json = await response.json();
      const { CreateNexusEndpointResponse } = await import(
        './schemas/create-nexus-endpoint-response'
      );
      return CreateNexusEndpointResponse.parse(json);
    } catch (error) {
      throw new TemporalError(`Failed to parse response from createNexusEndpoint.`, {
        request,
        response,
        operation: 'createNexusEndpoint',
      });
    }
  }

  /** @description Get a registered Nexus endpoint by ID. The returned version can be used for optimistic updates. */
  async getNexusEndpoint({
    id,
  }: {
    id: string;
  }): Promise<import('./schemas/get-nexus-endpoint-response').GetNexusEndpointResponse> {
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

    try {
      const json = await response.json();
      const { GetNexusEndpointResponse } = await import('./schemas/get-nexus-endpoint-response');
      return GetNexusEndpointResponse.parse(json);
    } catch (error) {
      throw new TemporalError(`Failed to parse response from getNexusEndpoint.`, {
        request,
        response,
        operation: 'getNexusEndpoint',
      });
    }
  }

  /** @description Delete an incoming Nexus service by ID. */
  async deleteNexusEndpoint({
    version,
    id,
  }: {
    version?: string;
    id: string;
  }): Promise<import('./schemas/delete-nexus-endpoint-response').DeleteNexusEndpointResponse> {
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

    try {
      const json = await response.json();
      const { DeleteNexusEndpointResponse } = await import(
        './schemas/delete-nexus-endpoint-response'
      );
      return DeleteNexusEndpointResponse.parse(json);
    } catch (error) {
      throw new TemporalError(`Failed to parse response from deleteNexusEndpoint.`, {
        request,
        response,
        operation: 'deleteNexusEndpoint',
      });
    }
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
  ): Promise<import('./schemas/update-nexus-endpoint-response').UpdateNexusEndpointResponse> {
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

    try {
      const json = await response.json();
      const { UpdateNexusEndpointResponse } = await import(
        './schemas/update-nexus-endpoint-response'
      );
      return UpdateNexusEndpointResponse.parse(json);
    } catch (error) {
      throw new TemporalError(`Failed to parse response from updateNexusEndpoint.`, {
        request,
        response,
        operation: 'updateNexusEndpoint',
      });
    }
  }

  /** @description GetSystemInfo returns information about the system. */
  async getSystemInfo(): Promise<
    import('./schemas/get-system-info-response').GetSystemInfoResponse
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

    try {
      const json = await response.json();
      const { GetSystemInfoResponse } = await import('./schemas/get-system-info-response');
      return GetSystemInfoResponse.parse(json);
    } catch (error) {
      throw new TemporalError(`Failed to parse response from getSystemInfo.`, {
        request,
        response,
        operation: 'getSystemInfo',
      });
    }
  }
}

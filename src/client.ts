/**
 * This file was automatically generated. Do not modify.
 */

import type { components } from './schema';

export default class TemporalClient {
  /**
   * @param The base URL of the Temporal API.
   * @example
   * const client = new TemporalClient('https://api.temporal.io');
   */
  constructor(private readonly baseURL: string) {}

  /** @description GetClusterInfo returns information about temporal cluster */
  async getClusterInfo({
    onError,
  }: {
    onError: (response: Response) => void;
  }): Promise<components['schemas']['GetClusterInfoResponse']> {
    const url = new URL(`/api/v1/cluster-info`, this.baseURL);

    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      if (onError) {
        onError(response);
      } else {
        throw new Error(`getClusterInfo request failed.`);
      }
    }

    return response.json();
  }

  /** @description ListNamespaces returns the information and configuration for all namespaces. */
  async listNamespaces({
    pageSize,
    nextPageToken,
    includeDeleted,
    onError,
  }: {
    pageSize?: number;
    nextPageToken?: string;
    includeDeleted?: boolean;
    onError: (response: Response) => void;
  }): Promise<components['schemas']['ListNamespacesResponse']> {
    const url = new URL(`/api/v1/namespaces`, this.baseURL);

    if (pageSize) url.searchParams.append('pageSize', String(pageSize));

    if (nextPageToken) url.searchParams.append('nextPageToken', String(nextPageToken));

    if (includeDeleted)
      url.searchParams.append('namespaceFilter.includeDeleted', String(includeDeleted));

    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      if (onError) {
        onError(response);
      } else {
        throw new Error(`listNamespaces request failed.`);
      }
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
  async registerNamespace({
    body,
    onError,
  }: {
    body: components['schemas']['RegisterNamespaceRequest'];
    onError: (response: Response) => void;
  }): Promise<components['schemas']['RegisterNamespaceResponse']> {
    const url = new URL(`/api/v1/namespaces`, this.baseURL);

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      if (onError) {
        onError(response);
      } else {
        throw new Error(`registerNamespace request failed.`);
      }
    }

    return response.json();
  }

  /** @description DescribeNamespace returns the information and configuration for a registered namespace. */
  async describeNamespace({
    id,
    namespace,
    onError,
  }: {
    namespace: string;
    id?: string;
    onError: (response: Response) => void;
  }): Promise<components['schemas']['DescribeNamespaceResponse']> {
    const url = new URL(`/api/v1/namespaces/${namespace}`, this.baseURL);

    if (id) url.searchParams.append('id', String(id));

    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      if (onError) {
        onError(response);
      } else {
        throw new Error(`describeNamespace request failed.`);
      }
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
  async respondActivityTaskCanceled({
    namespace,
    body,
    onError,
  }: {
    namespace: string;
    body: components['schemas']['RespondActivityTaskCanceledRequest'];
    onError: (response: Response) => void;
  }): Promise<components['schemas']['RespondActivityTaskCanceledResponse']> {
    const url = new URL(`/api/v1/namespaces/${namespace}/activities/cancel`, this.baseURL);

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      if (onError) {
        onError(response);
      } else {
        throw new Error(`respondActivityTaskCanceled request failed.`);
      }
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
  async respondActivityTaskCanceledById({
    namespace,
    body,
    onError,
  }: {
    namespace: string;
    body: components['schemas']['RespondActivityTaskCanceledByIdRequest'];
    onError: (response: Response) => void;
  }): Promise<components['schemas']['RespondActivityTaskCanceledByIdResponse']> {
    const url = new URL(`/api/v1/namespaces/${namespace}/activities/cancel-by-id`, this.baseURL);

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      if (onError) {
        onError(response);
      } else {
        throw new Error(`respondActivityTaskCanceledById request failed.`);
      }
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
  async respondActivityTaskCompleted({
    namespace,
    body,
    onError,
  }: {
    namespace: string;
    body: components['schemas']['RespondActivityTaskCompletedRequest'];
    onError: (response: Response) => void;
  }): Promise<components['schemas']['RespondActivityTaskCompletedResponse']> {
    const url = new URL(`/api/v1/namespaces/${namespace}/activities/complete`, this.baseURL);

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      if (onError) {
        onError(response);
      } else {
        throw new Error(`respondActivityTaskCompleted request failed.`);
      }
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
  async respondActivityTaskCompletedById({
    namespace,
    body,
    onError,
  }: {
    namespace: string;
    body: components['schemas']['RespondActivityTaskCompletedByIdRequest'];
    onError: (response: Response) => void;
  }): Promise<components['schemas']['RespondActivityTaskCompletedByIdResponse']> {
    const url = new URL(`/api/v1/namespaces/${namespace}/activities/complete-by-id`, this.baseURL);

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      if (onError) {
        onError(response);
      } else {
        throw new Error(`respondActivityTaskCompletedById request failed.`);
      }
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
  async respondActivityTaskFailed({
    namespace,
    body,
    onError,
  }: {
    namespace: string;
    body: components['schemas']['RespondActivityTaskFailedRequest'];
    onError: (response: Response) => void;
  }): Promise<components['schemas']['RespondActivityTaskFailedResponse']> {
    const url = new URL(`/api/v1/namespaces/${namespace}/activities/fail`, this.baseURL);

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      if (onError) {
        onError(response);
      } else {
        throw new Error(`respondActivityTaskFailed request failed.`);
      }
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
  async respondActivityTaskFailedById({
    namespace,
    body,
    onError,
  }: {
    namespace: string;
    body: components['schemas']['RespondActivityTaskFailedByIdRequest'];
    onError: (response: Response) => void;
  }): Promise<components['schemas']['RespondActivityTaskFailedByIdResponse']> {
    const url = new URL(`/api/v1/namespaces/${namespace}/activities/fail-by-id`, this.baseURL);

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      if (onError) {
        onError(response);
      } else {
        throw new Error(`respondActivityTaskFailedById request failed.`);
      }
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
  async recordActivityTaskHeartbeat({
    namespace,
    body,
    onError,
  }: {
    namespace: string;
    body: components['schemas']['RecordActivityTaskHeartbeatRequest'];
    onError: (response: Response) => void;
  }): Promise<components['schemas']['RecordActivityTaskHeartbeatResponse']> {
    const url = new URL(`/api/v1/namespaces/${namespace}/activities/heartbeat`, this.baseURL);

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      if (onError) {
        onError(response);
      } else {
        throw new Error(`recordActivityTaskHeartbeat request failed.`);
      }
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
  async recordActivityTaskHeartbeatById({
    namespace,
    body,
    onError,
  }: {
    namespace: string;
    body: components['schemas']['RecordActivityTaskHeartbeatByIdRequest'];
    onError: (response: Response) => void;
  }): Promise<components['schemas']['RecordActivityTaskHeartbeatByIdResponse']> {
    const url = new URL(`/api/v1/namespaces/${namespace}/activities/heartbeat-by-id`, this.baseURL);

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      if (onError) {
        onError(response);
      } else {
        throw new Error(`recordActivityTaskHeartbeatById request failed.`);
      }
    }

    return response.json();
  }

  /**
   * @description UpdateActivityOptionsById is called by the client to update the options of an activity
   *  (-- api-linter: core::0136::prepositions=disabled
   *      aip.dev/not-precedent: "By" is used to indicate request type. --)
   */
  async updateActivityOptionsById({
    namespace,
    body,
    onError,
  }: {
    namespace: string;
    body: components['schemas']['UpdateActivityOptionsByIdRequest'];
    onError: (response: Response) => void;
  }): Promise<components['schemas']['UpdateActivityOptionsByIdResponse']> {
    const url = new URL(
      `/api/v1/namespaces/${namespace}/activities/update-options-by-id`,
      this.baseURL,
    );

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      if (onError) {
        onError(response);
      } else {
        throw new Error(`updateActivityOptionsById request failed.`);
      }
    }

    return response.json();
  }

  /** @description ListArchivedWorkflowExecutions is a visibility API to list archived workflow executions in a specific namespace. */
  async listArchivedWorkflowExecutions({
    pageSize,
    nextPageToken,
    query,
    namespace,
    onError,
  }: {
    namespace: string;
    pageSize?: number;
    nextPageToken?: string;
    query?: string;
    onError: (response: Response) => void;
  }): Promise<components['schemas']['ListArchivedWorkflowExecutionsResponse']> {
    const url = new URL(`/api/v1/namespaces/${namespace}/archived-workflows`, this.baseURL);

    if (pageSize) url.searchParams.append('pageSize', String(pageSize));

    if (nextPageToken) url.searchParams.append('nextPageToken', String(nextPageToken));

    if (query) url.searchParams.append('query', String(query));

    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      if (onError) {
        onError(response);
      } else {
        throw new Error(`listArchivedWorkflowExecutions request failed.`);
      }
    }

    return response.json();
  }

  /** @description ListBatchOperations returns a list of batch operations */
  async listBatchOperations({
    pageSize,
    nextPageToken,
    namespace,
    onError,
  }: {
    namespace: string;
    pageSize?: number;
    nextPageToken?: string;
    onError: (response: Response) => void;
  }): Promise<components['schemas']['ListBatchOperationsResponse']> {
    const url = new URL(`/api/v1/namespaces/${namespace}/batch-operations`, this.baseURL);

    if (pageSize) url.searchParams.append('pageSize', String(pageSize));

    if (nextPageToken) url.searchParams.append('nextPageToken', String(nextPageToken));

    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      if (onError) {
        onError(response);
      } else {
        throw new Error(`listBatchOperations request failed.`);
      }
    }

    return response.json();
  }

  /** @description DescribeBatchOperation returns the information about a batch operation */
  async describeBatchOperation({
    namespace,
    jobId,
    onError,
  }: {
    namespace: string;
    jobId: string;
    onError: (response: Response) => void;
  }): Promise<components['schemas']['DescribeBatchOperationResponse']> {
    const url = new URL(`/api/v1/namespaces/${namespace}/batch-operations/${jobId}`, this.baseURL);

    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      if (onError) {
        onError(response);
      } else {
        throw new Error(`describeBatchOperation request failed.`);
      }
    }

    return response.json();
  }

  /** @description StartBatchOperation starts a new batch operation */
  async startBatchOperation({
    namespace,
    jobId,
    body,
    onError,
  }: {
    namespace: string;
    jobId: string;
    body: components['schemas']['StartBatchOperationRequest'];
    onError: (response: Response) => void;
  }): Promise<components['schemas']['StartBatchOperationResponse']> {
    const url = new URL(`/api/v1/namespaces/${namespace}/batch-operations/${jobId}`, this.baseURL);

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      if (onError) {
        onError(response);
      } else {
        throw new Error(`startBatchOperation request failed.`);
      }
    }

    return response.json();
  }

  /** @description StopBatchOperation stops a batch operation */
  async stopBatchOperation({
    namespace,
    jobId,
    body,
    onError,
  }: {
    namespace: string;
    jobId: string;
    body: components['schemas']['StopBatchOperationRequest'];
    onError: (response: Response) => void;
  }): Promise<components['schemas']['StopBatchOperationResponse']> {
    const url = new URL(
      `/api/v1/namespaces/${namespace}/batch-operations/${jobId}/stop`,
      this.baseURL,
    );

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      if (onError) {
        onError(response);
      } else {
        throw new Error(`stopBatchOperation request failed.`);
      }
    }

    return response.json();
  }

  /** @description List all schedules in a namespace. */
  async listSchedules({
    maximumPageSize,
    nextPageToken,
    query,
    namespace,
    onError,
  }: {
    namespace: string;
    maximumPageSize?: number;
    nextPageToken?: string;
    query?: string;
    onError: (response: Response) => void;
  }): Promise<components['schemas']['ListSchedulesResponse']> {
    const url = new URL(`/api/v1/namespaces/${namespace}/schedules`, this.baseURL);

    if (maximumPageSize) url.searchParams.append('maximumPageSize', String(maximumPageSize));

    if (nextPageToken) url.searchParams.append('nextPageToken', String(nextPageToken));

    if (query) url.searchParams.append('query', String(query));

    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      if (onError) {
        onError(response);
      } else {
        throw new Error(`listSchedules request failed.`);
      }
    }

    return response.json();
  }

  /** @description Returns the schedule description and current state of an existing schedule. */
  async describeSchedule({
    namespace,
    scheduleId,
    onError,
  }: {
    namespace: string;
    scheduleId: string;
    onError: (response: Response) => void;
  }): Promise<components['schemas']['DescribeScheduleResponse']> {
    const url = new URL(`/api/v1/namespaces/${namespace}/schedules/${scheduleId}`, this.baseURL);

    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      if (onError) {
        onError(response);
      } else {
        throw new Error(`describeSchedule request failed.`);
      }
    }

    return response.json();
  }

  /** @description Creates a new schedule. */
  async createSchedule({
    namespace,
    scheduleId,
    body,
    onError,
  }: {
    namespace: string;
    scheduleId: string;
    body: components['schemas']['CreateScheduleRequest'];
    onError: (response: Response) => void;
  }): Promise<components['schemas']['CreateScheduleResponse']> {
    const url = new URL(`/api/v1/namespaces/${namespace}/schedules/${scheduleId}`, this.baseURL);

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      if (onError) {
        onError(response);
      } else {
        throw new Error(`createSchedule request failed.`);
      }
    }

    return response.json();
  }

  /** @description Deletes a schedule, removing it from the system. */
  async deleteSchedule({
    identity,
    namespace,
    scheduleId,
    onError,
  }: {
    namespace: string;
    scheduleId: string;
    identity?: string;
    onError: (response: Response) => void;
  }): Promise<components['schemas']['DeleteScheduleResponse']> {
    const url = new URL(`/api/v1/namespaces/${namespace}/schedules/${scheduleId}`, this.baseURL);

    if (identity) url.searchParams.append('identity', String(identity));

    const response = await fetch(url, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      if (onError) {
        onError(response);
      } else {
        throw new Error(`deleteSchedule request failed.`);
      }
    }

    return response.json();
  }

  /** @description Lists matching times within a range. */
  async listScheduleMatchingTimes({
    startTime,
    endTime,
    namespace,
    scheduleId,
    onError,
  }: {
    namespace: string;
    scheduleId: string;
    startTime?: string;
    endTime?: string;
    onError: (response: Response) => void;
  }): Promise<components['schemas']['ListScheduleMatchingTimesResponse']> {
    const url = new URL(
      `/api/v1/namespaces/${namespace}/schedules/${scheduleId}/matching-times`,
      this.baseURL,
    );

    if (startTime) url.searchParams.append('startTime', String(startTime));

    if (endTime) url.searchParams.append('endTime', String(endTime));

    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      if (onError) {
        onError(response);
      } else {
        throw new Error(`listScheduleMatchingTimes request failed.`);
      }
    }

    return response.json();
  }

  /** @description Makes a specific change to a schedule or triggers an immediate action. */
  async patchSchedule({
    namespace,
    scheduleId,
    body,
    onError,
  }: {
    namespace: string;
    scheduleId: string;
    body: components['schemas']['PatchScheduleRequest'];
    onError: (response: Response) => void;
  }): Promise<components['schemas']['PatchScheduleResponse']> {
    const url = new URL(
      `/api/v1/namespaces/${namespace}/schedules/${scheduleId}/patch`,
      this.baseURL,
    );

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      if (onError) {
        onError(response);
      } else {
        throw new Error(`patchSchedule request failed.`);
      }
    }

    return response.json();
  }

  /** @description Changes the configuration or state of an existing schedule. */
  async updateSchedule({
    namespace,
    scheduleId,
    body,
    onError,
  }: {
    namespace: string;
    scheduleId: string;
    body: components['schemas']['UpdateScheduleRequest'];
    onError: (response: Response) => void;
  }): Promise<components['schemas']['UpdateScheduleResponse']> {
    const url = new URL(
      `/api/v1/namespaces/${namespace}/schedules/${scheduleId}/update`,
      this.baseURL,
    );

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      if (onError) {
        onError(response);
      } else {
        throw new Error(`updateSchedule request failed.`);
      }
    }

    return response.json();
  }

  /** @description ListSearchAttributes returns comprehensive information about search attributes. */
  async listSearchAttributes({
    namespace,
    onError,
  }: {
    namespace: string;
    onError: (response: Response) => void;
  }): Promise<components['schemas']['ListSearchAttributesResponse']> {
    const url = new URL(`/api/v1/namespaces/${namespace}/search-attributes`, this.baseURL);

    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      if (onError) {
        onError(response);
      } else {
        throw new Error(`listSearchAttributes request failed.`);
      }
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
    kind,
    normalName,
    taskQueueType,
    includeTaskQueueStatus,
    apiMode,
    buildIds,
    unversioned,
    allActive,
    taskQueueTypes,
    reportStats,
    reportPollers,
    reportTaskReachability,
    namespace,
    name,
    onError,
  }: {
    namespace: string;
    name: string;
    taskQueueName: string;
    kind?: 'TASK_QUEUE_KIND_UNSPECIFIED' | 'TASK_QUEUE_KIND_NORMAL' | 'TASK_QUEUE_KIND_STICKY';
    normalName?: string;
    taskQueueType?:
      | 'TASK_QUEUE_TYPE_UNSPECIFIED'
      | 'TASK_QUEUE_TYPE_WORKFLOW'
      | 'TASK_QUEUE_TYPE_ACTIVITY'
      | 'TASK_QUEUE_TYPE_NEXUS';
    includeTaskQueueStatus?: boolean;
    apiMode?: 'DESCRIBE_TASK_QUEUE_MODE_UNSPECIFIED' | 'DESCRIBE_TASK_QUEUE_MODE_ENHANCED';
    buildIds?: readonly string[];
    unversioned?: boolean;
    allActive?: boolean;
    taskQueueTypes?: readonly (
      | 'TASK_QUEUE_TYPE_UNSPECIFIED'
      | 'TASK_QUEUE_TYPE_WORKFLOW'
      | 'TASK_QUEUE_TYPE_ACTIVITY'
      | 'TASK_QUEUE_TYPE_NEXUS'
    )[];
    reportStats?: boolean;
    reportPollers?: boolean;
    reportTaskReachability?: boolean;
    onError: (response: Response) => void;
  }): Promise<components['schemas']['DescribeTaskQueueResponse']> {
    const url = new URL(`/api/v1/namespaces/${namespace}/task-queues/${name}`, this.baseURL);

    if (taskQueueName) url.searchParams.append('taskQueue.name', String(taskQueueName));

    if (kind) url.searchParams.append('taskQueue.kind', String(kind));

    if (normalName) url.searchParams.append('taskQueue.normalName', String(normalName));

    if (taskQueueType) url.searchParams.append('taskQueueType', String(taskQueueType));

    if (includeTaskQueueStatus)
      url.searchParams.append('includeTaskQueueStatus', String(includeTaskQueueStatus));

    if (apiMode) url.searchParams.append('apiMode', String(apiMode));

    if (buildIds) url.searchParams.append('versions.buildIds', String(buildIds));

    if (unversioned) url.searchParams.append('versions.unversioned', String(unversioned));

    if (allActive) url.searchParams.append('versions.allActive', String(allActive));

    if (taskQueueTypes) url.searchParams.append('taskQueueTypes', String(taskQueueTypes));

    if (reportStats) url.searchParams.append('reportStats', String(reportStats));

    if (reportPollers) url.searchParams.append('reportPollers', String(reportPollers));

    if (reportTaskReachability)
      url.searchParams.append('reportTaskReachability', String(reportTaskReachability));

    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      if (onError) {
        onError(response);
      } else {
        throw new Error(`describeTaskQueue request failed.`);
      }
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
    onError,
  }: {
    namespace: string;
    taskQueue: string;
    maxSets?: number;
    onError: (response: Response) => void;
  }): Promise<components['schemas']['GetWorkerBuildIdCompatibilityResponse']> {
    const url = new URL(
      `/api/v1/namespaces/${namespace}/task-queues/${taskQueue}/worker-build-id-compatibility`,
      this.baseURL,
    );

    if (maxSets) url.searchParams.append('maxSets', String(maxSets));

    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      if (onError) {
        onError(response);
      } else {
        throw new Error(`getWorkerBuildIdCompatibility request failed.`);
      }
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
    onError,
  }: {
    namespace: string;
    taskQueue: string;
    onError: (response: Response) => void;
  }): Promise<components['schemas']['GetWorkerVersioningRulesResponse']> {
    const url = new URL(
      `/api/v1/namespaces/${namespace}/task-queues/${taskQueue}/worker-versioning-rules`,
      this.baseURL,
    );

    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      if (onError) {
        onError(response);
      } else {
        throw new Error(`getWorkerVersioningRules request failed.`);
      }
    }

    return response.json();
  }

  /**
   * @description UpdateNamespace is used to update the information and configuration of a registered
   *  namespace.
   */
  async updateNamespace({
    namespace,
    body,
    onError,
  }: {
    namespace: string;
    body: components['schemas']['UpdateNamespaceRequest'];
    onError: (response: Response) => void;
  }): Promise<components['schemas']['UpdateNamespaceResponse']> {
    const url = new URL(`/api/v1/namespaces/${namespace}/update`, this.baseURL);

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      if (onError) {
        onError(response);
      } else {
        throw new Error(`updateNamespace request failed.`);
      }
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
    onError,
  }: {
    namespace: string;
    buildIds?: readonly string[];
    taskQueues?: readonly string[];
    reachability?:
      | 'TASK_REACHABILITY_UNSPECIFIED'
      | 'TASK_REACHABILITY_NEW_WORKFLOWS'
      | 'TASK_REACHABILITY_EXISTING_WORKFLOWS'
      | 'TASK_REACHABILITY_OPEN_WORKFLOWS'
      | 'TASK_REACHABILITY_CLOSED_WORKFLOWS';
    onError: (response: Response) => void;
  }): Promise<components['schemas']['GetWorkerTaskReachabilityResponse']> {
    const url = new URL(`/api/v1/namespaces/${namespace}/worker-task-reachability`, this.baseURL);

    if (buildIds) url.searchParams.append('buildIds', String(buildIds));

    if (taskQueues) url.searchParams.append('taskQueues', String(taskQueues));

    if (reachability) url.searchParams.append('reachability', String(reachability));

    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      if (onError) {
        onError(response);
      } else {
        throw new Error(`getWorkerTaskReachability request failed.`);
      }
    }

    return response.json();
  }

  /** @description CountWorkflowExecutions is a visibility API to count of workflow executions in a specific namespace. */
  async countWorkflowExecutions({
    query,
    namespace,
    onError,
  }: {
    namespace: string;
    query?: string;
    onError: (response: Response) => void;
  }): Promise<components['schemas']['CountWorkflowExecutionsResponse']> {
    const url = new URL(`/api/v1/namespaces/${namespace}/workflow-count`, this.baseURL);

    if (query) url.searchParams.append('query', String(query));

    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      if (onError) {
        onError(response);
      } else {
        throw new Error(`countWorkflowExecutions request failed.`);
      }
    }

    return response.json();
  }

  /** @description ListWorkflowExecutions is a visibility API to list workflow executions in a specific namespace. */
  async listWorkflowExecutions({
    pageSize,
    nextPageToken,
    query,
    namespace,
    onError,
  }: {
    namespace: string;
    pageSize?: number;
    nextPageToken?: string;
    query?: string;
    onError: (response: Response) => void;
  }): Promise<components['schemas']['ListWorkflowExecutionsResponse']> {
    const url = new URL(`/api/v1/namespaces/${namespace}/workflows`, this.baseURL);

    if (pageSize) url.searchParams.append('pageSize', String(pageSize));

    if (nextPageToken) url.searchParams.append('nextPageToken', String(nextPageToken));

    if (query) url.searchParams.append('query', String(query));

    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      if (onError) {
        onError(response);
      } else {
        throw new Error(`listWorkflowExecutions request failed.`);
      }
    }

    return response.json();
  }

  /** @description DescribeWorkflowExecution returns information about the specified workflow execution. */
  async describeWorkflowExecution({
    executionWorkflowId,
    runId,
    namespace,
    workflowId,
    onError,
  }: {
    namespace: string;
    workflowId: string;
    executionWorkflowId: string;
    runId?: string;
    onError: (response: Response) => void;
  }): Promise<components['schemas']['DescribeWorkflowExecutionResponse']> {
    const url = new URL(`/api/v1/namespaces/${namespace}/workflows/${workflowId}`, this.baseURL);

    if (executionWorkflowId)
      url.searchParams.append('execution.workflowId', String(executionWorkflowId));

    if (runId) url.searchParams.append('execution.runId', String(runId));

    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      if (onError) {
        onError(response);
      } else {
        throw new Error(`describeWorkflowExecution request failed.`);
      }
    }

    return response.json();
  }

  /**
   * @description GetWorkflowExecutionHistory returns the history of specified workflow execution. Fails with
   *  `NotFound` if the specified workflow execution is unknown to the service.
   */
  async getWorkflowExecutionHistory({
    executionWorkflowId,
    runId,
    maximumPageSize,
    nextPageToken,
    waitNewEvent,
    historyEventFilterType,
    skipArchival,
    namespace,
    workflowId,
    onError,
  }: {
    namespace: string;
    workflowId: string;
    executionWorkflowId: string;
    runId?: string;
    maximumPageSize?: number;
    nextPageToken?: string;
    waitNewEvent?: boolean;
    historyEventFilterType?:
      | 'HISTORY_EVENT_FILTER_TYPE_UNSPECIFIED'
      | 'HISTORY_EVENT_FILTER_TYPE_ALL_EVENT'
      | 'HISTORY_EVENT_FILTER_TYPE_CLOSE_EVENT';
    skipArchival?: boolean;
    onError: (response: Response) => void;
  }): Promise<components['schemas']['GetWorkflowExecutionHistoryResponse']> {
    const url = new URL(
      `/api/v1/namespaces/${namespace}/workflows/${workflowId}/history`,
      this.baseURL,
    );

    if (executionWorkflowId)
      url.searchParams.append('execution.workflowId', String(executionWorkflowId));

    if (runId) url.searchParams.append('execution.runId', String(runId));

    if (maximumPageSize) url.searchParams.append('maximumPageSize', String(maximumPageSize));

    if (nextPageToken) url.searchParams.append('nextPageToken', String(nextPageToken));

    if (waitNewEvent) url.searchParams.append('waitNewEvent', String(waitNewEvent));

    if (historyEventFilterType)
      url.searchParams.append('historyEventFilterType', String(historyEventFilterType));

    if (skipArchival) url.searchParams.append('skipArchival', String(skipArchival));

    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      if (onError) {
        onError(response);
      } else {
        throw new Error(`getWorkflowExecutionHistory request failed.`);
      }
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
    runId,
    maximumPageSize,
    nextPageToken,
    namespace,
    workflowId,
    onError,
  }: {
    namespace: string;
    workflowId: string;
    executionWorkflowId: string;
    runId?: string;
    maximumPageSize?: number;
    nextPageToken?: string;
    onError: (response: Response) => void;
  }): Promise<components['schemas']['GetWorkflowExecutionHistoryReverseResponse']> {
    const url = new URL(
      `/api/v1/namespaces/${namespace}/workflows/${workflowId}/history-reverse`,
      this.baseURL,
    );

    if (executionWorkflowId)
      url.searchParams.append('execution.workflowId', String(executionWorkflowId));

    if (runId) url.searchParams.append('execution.runId', String(runId));

    if (maximumPageSize) url.searchParams.append('maximumPageSize', String(maximumPageSize));

    if (nextPageToken) url.searchParams.append('nextPageToken', String(nextPageToken));

    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      if (onError) {
        onError(response);
      } else {
        throw new Error(`getWorkflowExecutionHistoryReverse request failed.`);
      }
    }

    return response.json();
  }

  /** @description QueryWorkflow requests a query be executed for a specified workflow execution. */
  async queryWorkflow({
    namespace,
    workflowId,
    queryType,
    body,
    onError,
  }: {
    namespace: string;
    workflowId: string;
    queryType: string;
    body: components['schemas']['QueryWorkflowRequest'];
    onError: (response: Response) => void;
  }): Promise<components['schemas']['QueryWorkflowResponse']> {
    const url = new URL(
      `/api/v1/namespaces/${namespace}/workflows/${workflowId}/query/${queryType}`,
      this.baseURL,
    );

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      if (onError) {
        onError(response);
      } else {
        throw new Error(`queryWorkflow request failed.`);
      }
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
  async requestCancelWorkflowExecution({
    namespace,
    workflowId,
    body,
    onError,
  }: {
    namespace: string;
    workflowId: string;
    body: components['schemas']['RequestCancelWorkflowExecutionRequest'];
    onError: (response: Response) => void;
  }): Promise<components['schemas']['RequestCancelWorkflowExecutionResponse']> {
    const url = new URL(
      `/api/v1/namespaces/${namespace}/workflows/${workflowId}/cancel`,
      this.baseURL,
    );

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      if (onError) {
        onError(response);
      } else {
        throw new Error(`requestCancelWorkflowExecution request failed.`);
      }
    }

    return response.json();
  }

  /**
   * @description ResetWorkflowExecution will reset an existing workflow execution to a specified
   *  `WORKFLOW_TASK_COMPLETED` event (exclusive). It will immediately terminate the current
   *  execution instance.
   *  TODO: Does exclusive here mean *just* the completed event, or also WFT started? Otherwise the task is doomed to time out?
   */
  async resetWorkflowExecution({
    namespace,
    workflowId,
    body,
    onError,
  }: {
    namespace: string;
    workflowId: string;
    body: components['schemas']['ResetWorkflowExecutionRequest'];
    onError: (response: Response) => void;
  }): Promise<components['schemas']['ResetWorkflowExecutionResponse']> {
    const url = new URL(
      `/api/v1/namespaces/${namespace}/workflows/${workflowId}/reset`,
      this.baseURL,
    );

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      if (onError) {
        onError(response);
      } else {
        throw new Error(`resetWorkflowExecution request failed.`);
      }
    }

    return response.json();
  }

  /**
   * @description SignalWorkflowExecution is used to send a signal to a running workflow execution.
   *
   *  This results in a `WORKFLOW_EXECUTION_SIGNALED` event recorded in the history and a workflow
   *  task being created for the execution.
   */
  async signalWorkflowExecution({
    namespace,
    workflowId,
    signalName,
    body,
    onError,
  }: {
    namespace: string;
    workflowId: string;
    signalName: string;
    body: components['schemas']['SignalWorkflowExecutionRequest'];
    onError: (response: Response) => void;
  }): Promise<components['schemas']['SignalWorkflowExecutionResponse']> {
    const url = new URL(
      `/api/v1/namespaces/${namespace}/workflows/${workflowId}/signal/${signalName}`,
      this.baseURL,
    );

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      if (onError) {
        onError(response);
      } else {
        throw new Error(`signalWorkflowExecution request failed.`);
      }
    }

    return response.json();
  }

  /**
   * @description TerminateWorkflowExecution terminates an existing workflow execution by recording a
   *  `WORKFLOW_EXECUTION_TERMINATED` event in the history and immediately terminating the
   *  execution instance.
   */
  async terminateWorkflowExecution({
    namespace,
    workflowId,
    body,
    onError,
  }: {
    namespace: string;
    workflowId: string;
    body: components['schemas']['TerminateWorkflowExecutionRequest'];
    onError: (response: Response) => void;
  }): Promise<components['schemas']['TerminateWorkflowExecutionResponse']> {
    const url = new URL(
      `/api/v1/namespaces/${namespace}/workflows/${workflowId}/terminate`,
      this.baseURL,
    );

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      if (onError) {
        onError(response);
      } else {
        throw new Error(`terminateWorkflowExecution request failed.`);
      }
    }

    return response.json();
  }

  /** @description Invokes the specified Update function on user Workflow code. */
  async updateWorkflowExecution({
    namespace,
    workflowId,
    name,
    body,
    onError,
  }: {
    namespace: string;
    workflowId: string;
    name: string;
    body: components['schemas']['UpdateWorkflowExecutionRequest'];
    onError: (response: Response) => void;
  }): Promise<components['schemas']['UpdateWorkflowExecutionResponse']> {
    const url = new URL(
      `/api/v1/namespaces/${namespace}/workflows/${workflowId}/update/${name}`,
      this.baseURL,
    );

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      if (onError) {
        onError(response);
      } else {
        throw new Error(`updateWorkflowExecution request failed.`);
      }
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
  async startWorkflowExecution({
    namespace,
    workflowId,
    body,
    onError,
  }: {
    namespace: string;
    workflowId: string;
    body: components['schemas']['StartWorkflowExecutionRequest'];
    onError: (response: Response) => void;
  }): Promise<components['schemas']['StartWorkflowExecutionResponse']> {
    const url = new URL(`/api/v1/namespaces/${namespace}/workflows/${workflowId}`, this.baseURL);

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      if (onError) {
        onError(response);
      } else {
        throw new Error(`startWorkflowExecution request failed.`);
      }
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
  async signalWithStartWorkflowExecution({
    namespace,
    workflowId,
    signalName,
    body,
    onError,
  }: {
    namespace: string;
    workflowId: string;
    signalName: string;
    body: components['schemas']['SignalWithStartWorkflowExecutionRequest'];
    onError: (response: Response) => void;
  }): Promise<components['schemas']['SignalWithStartWorkflowExecutionResponse']> {
    const url = new URL(
      `/api/v1/namespaces/${namespace}/workflows/${workflowId}/signal-with-start/${signalName}`,
      this.baseURL,
    );

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      if (onError) {
        onError(response);
      } else {
        throw new Error(`signalWithStartWorkflowExecution request failed.`);
      }
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
  async executeMultiOperation({
    namespace,
    body,
    onError,
  }: {
    namespace: string;
    body: components['schemas']['ExecuteMultiOperationRequest'];
    onError: (response: Response) => void;
  }): Promise<components['schemas']['ExecuteMultiOperationResponse']> {
    const url = new URL(
      `/api/v1/namespaces/${namespace}/workflows/execute-multi-operation`,
      this.baseURL,
    );

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      if (onError) {
        onError(response);
      } else {
        throw new Error(`executeMultiOperation request failed.`);
      }
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
    onError,
  }: {
    pageSize?: number;
    nextPageToken?: string;
    name?: string;
    onError: (response: Response) => void;
  }): Promise<components['schemas']['ListNexusEndpointsResponse']> {
    const url = new URL(`/api/v1/nexus/endpoints`, this.baseURL);

    if (pageSize) url.searchParams.append('pageSize', String(pageSize));

    if (nextPageToken) url.searchParams.append('nextPageToken', String(nextPageToken));

    if (name) url.searchParams.append('name', String(name));

    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      if (onError) {
        onError(response);
      } else {
        throw new Error(`listNexusEndpoints request failed.`);
      }
    }

    return response.json();
  }

  /**
   * @description Create a Nexus endpoint. This will fail if an endpoint with the same name is already registered with a status of
   *  ALREADY_EXISTS.
   *  Returns the created endpoint with its initial version. You may use this version for subsequent updates.
   */
  async createNexusEndpoint({
    body,
    onError,
  }: {
    body: components['schemas']['CreateNexusEndpointRequest'];
    onError: (response: Response) => void;
  }): Promise<components['schemas']['CreateNexusEndpointResponse']> {
    const url = new URL(`/api/v1/nexus/endpoints`, this.baseURL);

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      if (onError) {
        onError(response);
      } else {
        throw new Error(`createNexusEndpoint request failed.`);
      }
    }

    return response.json();
  }

  /** @description Get a registered Nexus endpoint by ID. The returned version can be used for optimistic updates. */
  async getNexusEndpoint({
    id,
    onError,
  }: {
    id: string;
    onError: (response: Response) => void;
  }): Promise<components['schemas']['GetNexusEndpointResponse']> {
    const url = new URL(`/api/v1/nexus/endpoints/${id}`, this.baseURL);

    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      if (onError) {
        onError(response);
      } else {
        throw new Error(`getNexusEndpoint request failed.`);
      }
    }

    return response.json();
  }

  /** @description Delete an incoming Nexus service by ID. */
  async deleteNexusEndpoint({
    version,
    id,
    onError,
  }: {
    id: string;
    version?: string;
    onError: (response: Response) => void;
  }): Promise<components['schemas']['DeleteNexusEndpointResponse']> {
    const url = new URL(`/api/v1/nexus/endpoints/${id}`, this.baseURL);

    if (version) url.searchParams.append('version', String(version));

    const response = await fetch(url, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      if (onError) {
        onError(response);
      } else {
        throw new Error(`deleteNexusEndpoint request failed.`);
      }
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
  async updateNexusEndpoint({
    id,
    body,
    onError,
  }: {
    id: string;
    body: components['schemas']['UpdateNexusEndpointRequest'];
    onError: (response: Response) => void;
  }): Promise<components['schemas']['UpdateNexusEndpointResponse']> {
    const url = new URL(`/api/v1/nexus/endpoints/${id}/update`, this.baseURL);

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      if (onError) {
        onError(response);
      } else {
        throw new Error(`updateNexusEndpoint request failed.`);
      }
    }

    return response.json();
  }

  /** @description GetSystemInfo returns information about the system. */
  async getSystemInfo({
    onError,
  }: {
    onError: (response: Response) => void;
  }): Promise<components['schemas']['GetSystemInfoResponse']> {
    const url = new URL(`/api/v1/system-info`, this.baseURL);

    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      if (onError) {
        onError(response);
      } else {
        throw new Error(`getSystemInfo request failed.`);
      }
    }

    return response.json();
  }
}

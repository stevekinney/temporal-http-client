import type { components } from './schema';

type RequestOptions = {
  onError?: (response: Response) => void;
  baseUrl?: string;
};

/** @description GetClusterInfo returns information about temporal cluster */
export async function getClusterInfo({
  onError,
  baseUrl = window.location.origin,
}: RequestOptions = {}): Promise<components['schemas']['GetClusterInfoResponse']> {
  const url = new URL(`/api/v1/cluster-info`, baseUrl);

  return fetch(url, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  }).then((response) => {
    if (!response.ok) {
      if (onError) return onError(response);
      throw new Error(`getClusterInfo request failed.`);
    }
    return response.json();
  });
}

/** @description ListNamespaces returns the information and configuration for all namespaces. */
export async function listNamespaces(
  {
    pageSize,
    nextPageToken,
    includeDeleted,
  }: { pageSize?: number; nextPageToken?: string; includeDeleted?: boolean },
  { onError, baseUrl = window.location.origin }: RequestOptions = {},
): Promise<components['schemas']['ListNamespacesResponse']> {
  const url = new URL(`/api/v1/namespaces`, baseUrl);

  if (pageSize) url.searchParams.append('pageSize', String(pageSize));

  if (nextPageToken) url.searchParams.append('nextPageToken', String(nextPageToken));

  if (includeDeleted)
    url.searchParams.append('namespaceFilter.includeDeleted', String(includeDeleted));

  return fetch(url, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  }).then((response) => {
    if (!response.ok) {
      if (onError) return onError(response);
      throw new Error(`listNamespaces request failed.`);
    }
    return response.json();
  });
}

/**
 * @description RegisterNamespace creates a new namespace which can be used as a container for all resources.
 *
 *  A Namespace is a top level entity within Temporal, and is used as a container for resources
 *  like workflow executions, task queues, etc. A Namespace acts as a sandbox and provides
 *  isolation for all resources within the namespace. All resources belongs to exactly one
 *  namespace.
 */
export async function registerNamespace(
  { body }: { body: components['schemas']['RegisterNamespaceRequest'] },
  { onError, baseUrl = window.location.origin }: RequestOptions = {},
): Promise<components['schemas']['RegisterNamespaceResponse']> {
  const url = new URL(`/api/v1/namespaces`, baseUrl);

  return fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  }).then((response) => {
    if (!response.ok) {
      if (onError) return onError(response);
      throw new Error(`registerNamespace request failed.`);
    }
    return response.json();
  });
}

/** @description DescribeNamespace returns the information and configuration for a registered namespace. */
export async function describeNamespace(
  { id, namespace }: { namespace: string; id?: string },
  { onError, baseUrl = window.location.origin }: RequestOptions = {},
): Promise<components['schemas']['DescribeNamespaceResponse']> {
  const url = new URL(`/api/v1/namespaces/${namespace}`, baseUrl);

  if (id) url.searchParams.append('id', String(id));

  return fetch(url, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  }).then((response) => {
    if (!response.ok) {
      if (onError) return onError(response);
      throw new Error(`describeNamespace request failed.`);
    }
    return response.json();
  });
}

/**
 * @description RespondActivityTaskFailed is called by workers when processing an activity task fails.
 *
 *  This results in a new `ACTIVITY_TASK_CANCELED` event being written to the workflow history
 *  and a new workflow task created for the workflow. Fails with `NotFound` if the task token is
 *  no longer valid due to activity timeout, already being completed, or never having existed.
 */
export async function respondActivityTaskCanceled(
  {
    namespace,
    body,
  }: { namespace: string; body: components['schemas']['RespondActivityTaskCanceledRequest'] },
  { onError, baseUrl = window.location.origin }: RequestOptions = {},
): Promise<components['schemas']['RespondActivityTaskCanceledResponse']> {
  const url = new URL(`/api/v1/namespaces/${namespace}/activities/cancel`, baseUrl);

  return fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  }).then((response) => {
    if (!response.ok) {
      if (onError) return onError(response);
      throw new Error(`respondActivityTaskCanceled request failed.`);
    }
    return response.json();
  });
}

/**
 * @description See `RecordActivityTaskCanceled`. This version allows clients to record failures by
 *  namespace/workflow id/activity id instead of task token.
 *
 *  (-- api-linter: core::0136::prepositions=disabled
 *      aip.dev/not-precedent: "By" is used to indicate request type. --)
 */
export async function respondActivityTaskCanceledById(
  {
    namespace,
    body,
  }: { namespace: string; body: components['schemas']['RespondActivityTaskCanceledByIdRequest'] },
  { onError, baseUrl = window.location.origin }: RequestOptions = {},
): Promise<components['schemas']['RespondActivityTaskCanceledByIdResponse']> {
  const url = new URL(`/api/v1/namespaces/${namespace}/activities/cancel-by-id`, baseUrl);

  return fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  }).then((response) => {
    if (!response.ok) {
      if (onError) return onError(response);
      throw new Error(`respondActivityTaskCanceledById request failed.`);
    }
    return response.json();
  });
}

/**
 * @description RespondActivityTaskCompleted is called by workers when they successfully complete an activity
 *  task.
 *
 *  This results in a new `ACTIVITY_TASK_COMPLETED` event being written to the workflow history
 *  and a new workflow task created for the workflow. Fails with `NotFound` if the task token is
 *  no longer valid due to activity timeout, already being completed, or never having existed.
 */
export async function respondActivityTaskCompleted(
  {
    namespace,
    body,
  }: { namespace: string; body: components['schemas']['RespondActivityTaskCompletedRequest'] },
  { onError, baseUrl = window.location.origin }: RequestOptions = {},
): Promise<components['schemas']['RespondActivityTaskCompletedResponse']> {
  const url = new URL(`/api/v1/namespaces/${namespace}/activities/complete`, baseUrl);

  return fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  }).then((response) => {
    if (!response.ok) {
      if (onError) return onError(response);
      throw new Error(`respondActivityTaskCompleted request failed.`);
    }
    return response.json();
  });
}

/**
 * @description See `RecordActivityTaskCompleted`. This version allows clients to record completions by
 *  namespace/workflow id/activity id instead of task token.
 *
 *  (-- api-linter: core::0136::prepositions=disabled
 *      aip.dev/not-precedent: "By" is used to indicate request type. --)
 */
export async function respondActivityTaskCompletedById(
  {
    namespace,
    body,
  }: { namespace: string; body: components['schemas']['RespondActivityTaskCompletedByIdRequest'] },
  { onError, baseUrl = window.location.origin }: RequestOptions = {},
): Promise<components['schemas']['RespondActivityTaskCompletedByIdResponse']> {
  const url = new URL(`/api/v1/namespaces/${namespace}/activities/complete-by-id`, baseUrl);

  return fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  }).then((response) => {
    if (!response.ok) {
      if (onError) return onError(response);
      throw new Error(`respondActivityTaskCompletedById request failed.`);
    }
    return response.json();
  });
}

/**
 * @description RespondActivityTaskFailed is called by workers when processing an activity task fails.
 *
 *  This results in a new `ACTIVITY_TASK_FAILED` event being written to the workflow history and
 *  a new workflow task created for the workflow. Fails with `NotFound` if the task token is no
 *  longer valid due to activity timeout, already being completed, or never having existed.
 */
export async function respondActivityTaskFailed(
  {
    namespace,
    body,
  }: { namespace: string; body: components['schemas']['RespondActivityTaskFailedRequest'] },
  { onError, baseUrl = window.location.origin }: RequestOptions = {},
): Promise<components['schemas']['RespondActivityTaskFailedResponse']> {
  const url = new URL(`/api/v1/namespaces/${namespace}/activities/fail`, baseUrl);

  return fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  }).then((response) => {
    if (!response.ok) {
      if (onError) return onError(response);
      throw new Error(`respondActivityTaskFailed request failed.`);
    }
    return response.json();
  });
}

/**
 * @description See `RecordActivityTaskFailed`. This version allows clients to record failures by
 *  namespace/workflow id/activity id instead of task token.
 *
 *  (-- api-linter: core::0136::prepositions=disabled
 *      aip.dev/not-precedent: "By" is used to indicate request type. --)
 */
export async function respondActivityTaskFailedById(
  {
    namespace,
    body,
  }: { namespace: string; body: components['schemas']['RespondActivityTaskFailedByIdRequest'] },
  { onError, baseUrl = window.location.origin }: RequestOptions = {},
): Promise<components['schemas']['RespondActivityTaskFailedByIdResponse']> {
  const url = new URL(`/api/v1/namespaces/${namespace}/activities/fail-by-id`, baseUrl);

  return fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  }).then((response) => {
    if (!response.ok) {
      if (onError) return onError(response);
      throw new Error(`respondActivityTaskFailedById request failed.`);
    }
    return response.json();
  });
}

/**
 * @description RecordActivityTaskHeartbeat is optionally called by workers while they execute activities.
 *
 *  If worker fails to heartbeat within the `heartbeat_timeout` interval for the activity task,
 *  then it will be marked as timed out and an `ACTIVITY_TASK_TIMED_OUT` event will be written to
 *  the workflow history. Calling `RecordActivityTaskHeartbeat` will fail with `NotFound` in
 *  such situations, in that event, the SDK should request cancellation of the activity.
 */
export async function recordActivityTaskHeartbeat(
  {
    namespace,
    body,
  }: { namespace: string; body: components['schemas']['RecordActivityTaskHeartbeatRequest'] },
  { onError, baseUrl = window.location.origin }: RequestOptions = {},
): Promise<components['schemas']['RecordActivityTaskHeartbeatResponse']> {
  const url = new URL(`/api/v1/namespaces/${namespace}/activities/heartbeat`, baseUrl);

  return fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  }).then((response) => {
    if (!response.ok) {
      if (onError) return onError(response);
      throw new Error(`recordActivityTaskHeartbeat request failed.`);
    }
    return response.json();
  });
}

/**
 * @description See `RecordActivityTaskHeartbeat`. This version allows clients to record heartbeats by
 *  namespace/workflow id/activity id instead of task token.
 *
 *  (-- api-linter: core::0136::prepositions=disabled
 *      aip.dev/not-precedent: "By" is used to indicate request type. --)
 */
export async function recordActivityTaskHeartbeatById(
  {
    namespace,
    body,
  }: { namespace: string; body: components['schemas']['RecordActivityTaskHeartbeatByIdRequest'] },
  { onError, baseUrl = window.location.origin }: RequestOptions = {},
): Promise<components['schemas']['RecordActivityTaskHeartbeatByIdResponse']> {
  const url = new URL(`/api/v1/namespaces/${namespace}/activities/heartbeat-by-id`, baseUrl);

  return fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  }).then((response) => {
    if (!response.ok) {
      if (onError) return onError(response);
      throw new Error(`recordActivityTaskHeartbeatById request failed.`);
    }
    return response.json();
  });
}

/**
 * @description UpdateActivityOptionsById is called by the client to update the options of an activity
 *  (-- api-linter: core::0136::prepositions=disabled
 *      aip.dev/not-precedent: "By" is used to indicate request type. --)
 */
export async function updateActivityOptionsById(
  {
    namespace,
    body,
  }: { namespace: string; body: components['schemas']['UpdateActivityOptionsByIdRequest'] },
  { onError, baseUrl = window.location.origin }: RequestOptions = {},
): Promise<components['schemas']['UpdateActivityOptionsByIdResponse']> {
  const url = new URL(`/api/v1/namespaces/${namespace}/activities/update-options-by-id`, baseUrl);

  return fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  }).then((response) => {
    if (!response.ok) {
      if (onError) return onError(response);
      throw new Error(`updateActivityOptionsById request failed.`);
    }
    return response.json();
  });
}

/** @description ListArchivedWorkflowExecutions is a visibility API to list archived workflow executions in a specific namespace. */
export async function listArchivedWorkflowExecutions(
  {
    pageSize,
    nextPageToken,
    query,
    namespace,
  }: { namespace: string; pageSize?: number; nextPageToken?: string; query?: string },
  { onError, baseUrl = window.location.origin }: RequestOptions = {},
): Promise<components['schemas']['ListArchivedWorkflowExecutionsResponse']> {
  const url = new URL(`/api/v1/namespaces/${namespace}/archived-workflows`, baseUrl);

  if (pageSize) url.searchParams.append('pageSize', String(pageSize));

  if (nextPageToken) url.searchParams.append('nextPageToken', String(nextPageToken));

  if (query) url.searchParams.append('query', String(query));

  return fetch(url, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  }).then((response) => {
    if (!response.ok) {
      if (onError) return onError(response);
      throw new Error(`listArchivedWorkflowExecutions request failed.`);
    }
    return response.json();
  });
}

/** @description ListBatchOperations returns a list of batch operations */
export async function listBatchOperations(
  {
    pageSize,
    nextPageToken,
    namespace,
  }: { namespace: string; pageSize?: number; nextPageToken?: string },
  { onError, baseUrl = window.location.origin }: RequestOptions = {},
): Promise<components['schemas']['ListBatchOperationsResponse']> {
  const url = new URL(`/api/v1/namespaces/${namespace}/batch-operations`, baseUrl);

  if (pageSize) url.searchParams.append('pageSize', String(pageSize));

  if (nextPageToken) url.searchParams.append('nextPageToken', String(nextPageToken));

  return fetch(url, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  }).then((response) => {
    if (!response.ok) {
      if (onError) return onError(response);
      throw new Error(`listBatchOperations request failed.`);
    }
    return response.json();
  });
}

/** @description DescribeBatchOperation returns the information about a batch operation */
export async function describeBatchOperation(
  { namespace, jobId }: { namespace: string; jobId: string },
  { onError, baseUrl = window.location.origin }: RequestOptions = {},
): Promise<components['schemas']['DescribeBatchOperationResponse']> {
  const url = new URL(`/api/v1/namespaces/${namespace}/batch-operations/${jobId}`, baseUrl);

  return fetch(url, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  }).then((response) => {
    if (!response.ok) {
      if (onError) return onError(response);
      throw new Error(`describeBatchOperation request failed.`);
    }
    return response.json();
  });
}

/** @description StartBatchOperation starts a new batch operation */
export async function startBatchOperation(
  {
    namespace,
    jobId,
    body,
  }: {
    namespace: string;
    jobId: string;
    body: components['schemas']['StartBatchOperationRequest'];
  },
  { onError, baseUrl = window.location.origin }: RequestOptions = {},
): Promise<components['schemas']['StartBatchOperationResponse']> {
  const url = new URL(`/api/v1/namespaces/${namespace}/batch-operations/${jobId}`, baseUrl);

  return fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  }).then((response) => {
    if (!response.ok) {
      if (onError) return onError(response);
      throw new Error(`startBatchOperation request failed.`);
    }
    return response.json();
  });
}

/** @description StopBatchOperation stops a batch operation */
export async function stopBatchOperation(
  {
    namespace,
    jobId,
    body,
  }: { namespace: string; jobId: string; body: components['schemas']['StopBatchOperationRequest'] },
  { onError, baseUrl = window.location.origin }: RequestOptions = {},
): Promise<components['schemas']['StopBatchOperationResponse']> {
  const url = new URL(`/api/v1/namespaces/${namespace}/batch-operations/${jobId}/stop`, baseUrl);

  return fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  }).then((response) => {
    if (!response.ok) {
      if (onError) return onError(response);
      throw new Error(`stopBatchOperation request failed.`);
    }
    return response.json();
  });
}

/** @description List all schedules in a namespace. */
export async function listSchedules(
  {
    maximumPageSize,
    nextPageToken,
    query,
    namespace,
  }: { namespace: string; maximumPageSize?: number; nextPageToken?: string; query?: string },
  { onError, baseUrl = window.location.origin }: RequestOptions = {},
): Promise<components['schemas']['ListSchedulesResponse']> {
  const url = new URL(`/api/v1/namespaces/${namespace}/schedules`, baseUrl);

  if (maximumPageSize) url.searchParams.append('maximumPageSize', String(maximumPageSize));

  if (nextPageToken) url.searchParams.append('nextPageToken', String(nextPageToken));

  if (query) url.searchParams.append('query', String(query));

  return fetch(url, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  }).then((response) => {
    if (!response.ok) {
      if (onError) return onError(response);
      throw new Error(`listSchedules request failed.`);
    }
    return response.json();
  });
}

/** @description Returns the schedule description and current state of an existing schedule. */
export async function describeSchedule(
  { namespace, scheduleId }: { namespace: string; scheduleId: string },
  { onError, baseUrl = window.location.origin }: RequestOptions = {},
): Promise<components['schemas']['DescribeScheduleResponse']> {
  const url = new URL(`/api/v1/namespaces/${namespace}/schedules/${scheduleId}`, baseUrl);

  return fetch(url, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  }).then((response) => {
    if (!response.ok) {
      if (onError) return onError(response);
      throw new Error(`describeSchedule request failed.`);
    }
    return response.json();
  });
}

/** @description Creates a new schedule. */
export async function createSchedule(
  {
    namespace,
    scheduleId,
    body,
  }: {
    namespace: string;
    scheduleId: string;
    body: components['schemas']['CreateScheduleRequest'];
  },
  { onError, baseUrl = window.location.origin }: RequestOptions = {},
): Promise<components['schemas']['CreateScheduleResponse']> {
  const url = new URL(`/api/v1/namespaces/${namespace}/schedules/${scheduleId}`, baseUrl);

  return fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  }).then((response) => {
    if (!response.ok) {
      if (onError) return onError(response);
      throw new Error(`createSchedule request failed.`);
    }
    return response.json();
  });
}

/** @description Deletes a schedule, removing it from the system. */
export async function deleteSchedule(
  { identity, namespace, scheduleId }: { namespace: string; scheduleId: string; identity?: string },
  { onError, baseUrl = window.location.origin }: RequestOptions = {},
): Promise<components['schemas']['DeleteScheduleResponse']> {
  const url = new URL(`/api/v1/namespaces/${namespace}/schedules/${scheduleId}`, baseUrl);

  if (identity) url.searchParams.append('identity', String(identity));

  return fetch(url, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  }).then((response) => {
    if (!response.ok) {
      if (onError) return onError(response);
      throw new Error(`deleteSchedule request failed.`);
    }
    return response.json();
  });
}

/** @description Lists matching times within a range. */
export async function listScheduleMatchingTimes(
  {
    startTime,
    endTime,
    namespace,
    scheduleId,
  }: { namespace: string; scheduleId: string; startTime?: string; endTime?: string },
  { onError, baseUrl = window.location.origin }: RequestOptions = {},
): Promise<components['schemas']['ListScheduleMatchingTimesResponse']> {
  const url = new URL(
    `/api/v1/namespaces/${namespace}/schedules/${scheduleId}/matching-times`,
    baseUrl,
  );

  if (startTime) url.searchParams.append('startTime', String(startTime));

  if (endTime) url.searchParams.append('endTime', String(endTime));

  return fetch(url, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  }).then((response) => {
    if (!response.ok) {
      if (onError) return onError(response);
      throw new Error(`listScheduleMatchingTimes request failed.`);
    }
    return response.json();
  });
}

/** @description Makes a specific change to a schedule or triggers an immediate action. */
export async function patchSchedule(
  {
    namespace,
    scheduleId,
    body,
  }: { namespace: string; scheduleId: string; body: components['schemas']['PatchScheduleRequest'] },
  { onError, baseUrl = window.location.origin }: RequestOptions = {},
): Promise<components['schemas']['PatchScheduleResponse']> {
  const url = new URL(`/api/v1/namespaces/${namespace}/schedules/${scheduleId}/patch`, baseUrl);

  return fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  }).then((response) => {
    if (!response.ok) {
      if (onError) return onError(response);
      throw new Error(`patchSchedule request failed.`);
    }
    return response.json();
  });
}

/** @description Changes the configuration or state of an existing schedule. */
export async function updateSchedule(
  {
    namespace,
    scheduleId,
    body,
  }: {
    namespace: string;
    scheduleId: string;
    body: components['schemas']['UpdateScheduleRequest'];
  },
  { onError, baseUrl = window.location.origin }: RequestOptions = {},
): Promise<components['schemas']['UpdateScheduleResponse']> {
  const url = new URL(`/api/v1/namespaces/${namespace}/schedules/${scheduleId}/update`, baseUrl);

  return fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  }).then((response) => {
    if (!response.ok) {
      if (onError) return onError(response);
      throw new Error(`updateSchedule request failed.`);
    }
    return response.json();
  });
}

/** @description ListSearchAttributes returns comprehensive information about search attributes. */
export async function listSearchAttributes(
  { namespace }: { namespace: string },
  { onError, baseUrl = window.location.origin }: RequestOptions = {},
): Promise<components['schemas']['ListSearchAttributesResponse']> {
  const url = new URL(`/api/v1/namespaces/${namespace}/search-attributes`, baseUrl);

  return fetch(url, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  }).then((response) => {
    if (!response.ok) {
      if (onError) return onError(response);
      throw new Error(`listSearchAttributes request failed.`);
    }
    return response.json();
  });
}

/**
 * @description DescribeTaskQueue returns the following information about the target task queue, broken down by Build ID:
 *    - List of pollers
 *    - Workflow Reachability status
 *    - Backlog info for Workflow and/or Activity tasks
 */
export async function describeTaskQueue(
  {
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
  },
  { onError, baseUrl = window.location.origin }: RequestOptions = {},
): Promise<components['schemas']['DescribeTaskQueueResponse']> {
  const url = new URL(`/api/v1/namespaces/${namespace}/task-queues/${name}`, baseUrl);

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

  return fetch(url, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  }).then((response) => {
    if (!response.ok) {
      if (onError) return onError(response);
      throw new Error(`describeTaskQueue request failed.`);
    }
    return response.json();
  });
}

/**
 * @description Deprecated. Use `GetWorkerVersioningRules`.
 *  Fetches the worker build id versioning sets for a task queue.
 */
export async function getWorkerBuildIdCompatibility(
  { maxSets, namespace, taskQueue }: { namespace: string; taskQueue: string; maxSets?: number },
  { onError, baseUrl = window.location.origin }: RequestOptions = {},
): Promise<components['schemas']['GetWorkerBuildIdCompatibilityResponse']> {
  const url = new URL(
    `/api/v1/namespaces/${namespace}/task-queues/${taskQueue}/worker-build-id-compatibility`,
    baseUrl,
  );

  if (maxSets) url.searchParams.append('maxSets', String(maxSets));

  return fetch(url, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  }).then((response) => {
    if (!response.ok) {
      if (onError) return onError(response);
      throw new Error(`getWorkerBuildIdCompatibility request failed.`);
    }
    return response.json();
  });
}

/**
 * @description Fetches the Build ID assignment and redirect rules for a Task Queue.
 *  WARNING: Worker Versioning is not yet stable and the API and behavior may change incompatibly.
 */
export async function getWorkerVersioningRules(
  { namespace, taskQueue }: { namespace: string; taskQueue: string },
  { onError, baseUrl = window.location.origin }: RequestOptions = {},
): Promise<components['schemas']['GetWorkerVersioningRulesResponse']> {
  const url = new URL(
    `/api/v1/namespaces/${namespace}/task-queues/${taskQueue}/worker-versioning-rules`,
    baseUrl,
  );

  return fetch(url, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  }).then((response) => {
    if (!response.ok) {
      if (onError) return onError(response);
      throw new Error(`getWorkerVersioningRules request failed.`);
    }
    return response.json();
  });
}

/**
 * @description UpdateNamespace is used to update the information and configuration of a registered
 *  namespace.
 */
export async function updateNamespace(
  { namespace, body }: { namespace: string; body: components['schemas']['UpdateNamespaceRequest'] },
  { onError, baseUrl = window.location.origin }: RequestOptions = {},
): Promise<components['schemas']['UpdateNamespaceResponse']> {
  const url = new URL(`/api/v1/namespaces/${namespace}/update`, baseUrl);

  return fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  }).then((response) => {
    if (!response.ok) {
      if (onError) return onError(response);
      throw new Error(`updateNamespace request failed.`);
    }
    return response.json();
  });
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
export async function getWorkerTaskReachability(
  {
    buildIds,
    taskQueues,
    reachability,
    namespace,
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
  },
  { onError, baseUrl = window.location.origin }: RequestOptions = {},
): Promise<components['schemas']['GetWorkerTaskReachabilityResponse']> {
  const url = new URL(`/api/v1/namespaces/${namespace}/worker-task-reachability`, baseUrl);

  if (buildIds) url.searchParams.append('buildIds', String(buildIds));

  if (taskQueues) url.searchParams.append('taskQueues', String(taskQueues));

  if (reachability) url.searchParams.append('reachability', String(reachability));

  return fetch(url, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  }).then((response) => {
    if (!response.ok) {
      if (onError) return onError(response);
      throw new Error(`getWorkerTaskReachability request failed.`);
    }
    return response.json();
  });
}

/** @description CountWorkflowExecutions is a visibility API to count of workflow executions in a specific namespace. */
export async function countWorkflowExecutions(
  { query, namespace }: { namespace: string; query?: string },
  { onError, baseUrl = window.location.origin }: RequestOptions = {},
): Promise<components['schemas']['CountWorkflowExecutionsResponse']> {
  const url = new URL(`/api/v1/namespaces/${namespace}/workflow-count`, baseUrl);

  if (query) url.searchParams.append('query', String(query));

  return fetch(url, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  }).then((response) => {
    if (!response.ok) {
      if (onError) return onError(response);
      throw new Error(`countWorkflowExecutions request failed.`);
    }
    return response.json();
  });
}

/** @description ListWorkflowExecutions is a visibility API to list workflow executions in a specific namespace. */
export async function listWorkflowExecutions(
  {
    pageSize,
    nextPageToken,
    query,
    namespace,
  }: { namespace: string; pageSize?: number; nextPageToken?: string; query?: string },
  { onError, baseUrl = window.location.origin }: RequestOptions = {},
): Promise<components['schemas']['ListWorkflowExecutionsResponse']> {
  const url = new URL(`/api/v1/namespaces/${namespace}/workflows`, baseUrl);

  if (pageSize) url.searchParams.append('pageSize', String(pageSize));

  if (nextPageToken) url.searchParams.append('nextPageToken', String(nextPageToken));

  if (query) url.searchParams.append('query', String(query));

  return fetch(url, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  }).then((response) => {
    if (!response.ok) {
      if (onError) return onError(response);
      throw new Error(`listWorkflowExecutions request failed.`);
    }
    return response.json();
  });
}

/** @description DescribeWorkflowExecution returns information about the specified workflow execution. */
export async function describeWorkflowExecution(
  {
    executionWorkflowId,
    runId,
    namespace,
    workflowId,
  }: { namespace: string; workflowId: string; executionWorkflowId: string; runId?: string },
  { onError, baseUrl = window.location.origin }: RequestOptions = {},
): Promise<components['schemas']['DescribeWorkflowExecutionResponse']> {
  const url = new URL(`/api/v1/namespaces/${namespace}/workflows/${workflowId}`, baseUrl);

  if (executionWorkflowId)
    url.searchParams.append('execution.workflowId', String(executionWorkflowId));

  if (runId) url.searchParams.append('execution.runId', String(runId));

  return fetch(url, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  }).then((response) => {
    if (!response.ok) {
      if (onError) return onError(response);
      throw new Error(`describeWorkflowExecution request failed.`);
    }
    return response.json();
  });
}

/**
 * @description GetWorkflowExecutionHistory returns the history of specified workflow execution. Fails with
 *  `NotFound` if the specified workflow execution is unknown to the service.
 */
export async function getWorkflowExecutionHistory(
  {
    executionWorkflowId,
    runId,
    maximumPageSize,
    nextPageToken,
    waitNewEvent,
    historyEventFilterType,
    skipArchival,
    namespace,
    workflowId,
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
  },
  { onError, baseUrl = window.location.origin }: RequestOptions = {},
): Promise<components['schemas']['GetWorkflowExecutionHistoryResponse']> {
  const url = new URL(`/api/v1/namespaces/${namespace}/workflows/${workflowId}/history`, baseUrl);

  if (executionWorkflowId)
    url.searchParams.append('execution.workflowId', String(executionWorkflowId));

  if (runId) url.searchParams.append('execution.runId', String(runId));

  if (maximumPageSize) url.searchParams.append('maximumPageSize', String(maximumPageSize));

  if (nextPageToken) url.searchParams.append('nextPageToken', String(nextPageToken));

  if (waitNewEvent) url.searchParams.append('waitNewEvent', String(waitNewEvent));

  if (historyEventFilterType)
    url.searchParams.append('historyEventFilterType', String(historyEventFilterType));

  if (skipArchival) url.searchParams.append('skipArchival', String(skipArchival));

  return fetch(url, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  }).then((response) => {
    if (!response.ok) {
      if (onError) return onError(response);
      throw new Error(`getWorkflowExecutionHistory request failed.`);
    }
    return response.json();
  });
}

/**
 * @description GetWorkflowExecutionHistoryReverse returns the history of specified workflow execution in reverse
 *  order (starting from last event). Fails with`NotFound` if the specified workflow execution is
 *  unknown to the service.
 */
export async function getWorkflowExecutionHistoryReverse(
  {
    executionWorkflowId,
    runId,
    maximumPageSize,
    nextPageToken,
    namespace,
    workflowId,
  }: {
    namespace: string;
    workflowId: string;
    executionWorkflowId: string;
    runId?: string;
    maximumPageSize?: number;
    nextPageToken?: string;
  },
  { onError, baseUrl = window.location.origin }: RequestOptions = {},
): Promise<components['schemas']['GetWorkflowExecutionHistoryReverseResponse']> {
  const url = new URL(
    `/api/v1/namespaces/${namespace}/workflows/${workflowId}/history-reverse`,
    baseUrl,
  );

  if (executionWorkflowId)
    url.searchParams.append('execution.workflowId', String(executionWorkflowId));

  if (runId) url.searchParams.append('execution.runId', String(runId));

  if (maximumPageSize) url.searchParams.append('maximumPageSize', String(maximumPageSize));

  if (nextPageToken) url.searchParams.append('nextPageToken', String(nextPageToken));

  return fetch(url, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  }).then((response) => {
    if (!response.ok) {
      if (onError) return onError(response);
      throw new Error(`getWorkflowExecutionHistoryReverse request failed.`);
    }
    return response.json();
  });
}

/** @description QueryWorkflow requests a query be executed for a specified workflow execution. */
export async function queryWorkflow(
  {
    namespace,
    workflowId,
    queryType,
    body,
  }: {
    namespace: string;
    workflowId: string;
    queryType: string;
    body: components['schemas']['QueryWorkflowRequest'];
  },
  { onError, baseUrl = window.location.origin }: RequestOptions = {},
): Promise<components['schemas']['QueryWorkflowResponse']> {
  const url = new URL(
    `/api/v1/namespaces/${namespace}/workflows/${workflowId}/query/${queryType}`,
    baseUrl,
  );

  return fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  }).then((response) => {
    if (!response.ok) {
      if (onError) return onError(response);
      throw new Error(`queryWorkflow request failed.`);
    }
    return response.json();
  });
}

/**
 * @description RequestCancelWorkflowExecution is called by workers when they want to request cancellation of
 *  a workflow execution.
 *
 *  This results in a new `WORKFLOW_EXECUTION_CANCEL_REQUESTED` event being written to the
 *  workflow history and a new workflow task created for the workflow. It returns success if the requested
 *  workflow is already closed. It fails with 'NotFound' if the requested workflow doesn't exist.
 */
export async function requestCancelWorkflowExecution(
  {
    namespace,
    workflowId,
    body,
  }: {
    namespace: string;
    workflowId: string;
    body: components['schemas']['RequestCancelWorkflowExecutionRequest'];
  },
  { onError, baseUrl = window.location.origin }: RequestOptions = {},
): Promise<components['schemas']['RequestCancelWorkflowExecutionResponse']> {
  const url = new URL(`/api/v1/namespaces/${namespace}/workflows/${workflowId}/cancel`, baseUrl);

  return fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  }).then((response) => {
    if (!response.ok) {
      if (onError) return onError(response);
      throw new Error(`requestCancelWorkflowExecution request failed.`);
    }
    return response.json();
  });
}

/**
 * @description ResetWorkflowExecution will reset an existing workflow execution to a specified
 *  `WORKFLOW_TASK_COMPLETED` event (exclusive). It will immediately terminate the current
 *  execution instance.
 *  TODO: Does exclusive here mean *just* the completed event, or also WFT started? Otherwise the task is doomed to time out?
 */
export async function resetWorkflowExecution(
  {
    namespace,
    workflowId,
    body,
  }: {
    namespace: string;
    workflowId: string;
    body: components['schemas']['ResetWorkflowExecutionRequest'];
  },
  { onError, baseUrl = window.location.origin }: RequestOptions = {},
): Promise<components['schemas']['ResetWorkflowExecutionResponse']> {
  const url = new URL(`/api/v1/namespaces/${namespace}/workflows/${workflowId}/reset`, baseUrl);

  return fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  }).then((response) => {
    if (!response.ok) {
      if (onError) return onError(response);
      throw new Error(`resetWorkflowExecution request failed.`);
    }
    return response.json();
  });
}

/**
 * @description SignalWorkflowExecution is used to send a signal to a running workflow execution.
 *
 *  This results in a `WORKFLOW_EXECUTION_SIGNALED` event recorded in the history and a workflow
 *  task being created for the execution.
 */
export async function signalWorkflowExecution(
  {
    namespace,
    workflowId,
    signalName,
    body,
  }: {
    namespace: string;
    workflowId: string;
    signalName: string;
    body: components['schemas']['SignalWorkflowExecutionRequest'];
  },
  { onError, baseUrl = window.location.origin }: RequestOptions = {},
): Promise<components['schemas']['SignalWorkflowExecutionResponse']> {
  const url = new URL(
    `/api/v1/namespaces/${namespace}/workflows/${workflowId}/signal/${signalName}`,
    baseUrl,
  );

  return fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  }).then((response) => {
    if (!response.ok) {
      if (onError) return onError(response);
      throw new Error(`signalWorkflowExecution request failed.`);
    }
    return response.json();
  });
}

/**
 * @description TerminateWorkflowExecution terminates an existing workflow execution by recording a
 *  `WORKFLOW_EXECUTION_TERMINATED` event in the history and immediately terminating the
 *  execution instance.
 */
export async function terminateWorkflowExecution(
  {
    namespace,
    workflowId,
    body,
  }: {
    namespace: string;
    workflowId: string;
    body: components['schemas']['TerminateWorkflowExecutionRequest'];
  },
  { onError, baseUrl = window.location.origin }: RequestOptions = {},
): Promise<components['schemas']['TerminateWorkflowExecutionResponse']> {
  const url = new URL(`/api/v1/namespaces/${namespace}/workflows/${workflowId}/terminate`, baseUrl);

  return fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  }).then((response) => {
    if (!response.ok) {
      if (onError) return onError(response);
      throw new Error(`terminateWorkflowExecution request failed.`);
    }
    return response.json();
  });
}

/** @description Invokes the specified Update function on user Workflow code. */
export async function updateWorkflowExecution(
  {
    namespace,
    workflowId,
    name,
    body,
  }: {
    namespace: string;
    workflowId: string;
    name: string;
    body: components['schemas']['UpdateWorkflowExecutionRequest'];
  },
  { onError, baseUrl = window.location.origin }: RequestOptions = {},
): Promise<components['schemas']['UpdateWorkflowExecutionResponse']> {
  const url = new URL(
    `/api/v1/namespaces/${namespace}/workflows/${workflowId}/update/${name}`,
    baseUrl,
  );

  return fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  }).then((response) => {
    if (!response.ok) {
      if (onError) return onError(response);
      throw new Error(`updateWorkflowExecution request failed.`);
    }
    return response.json();
  });
}

/**
 * @description StartWorkflowExecution starts a new workflow execution.
 *
 *  It will create the execution with a `WORKFLOW_EXECUTION_STARTED` event in its history and
 *  also schedule the first workflow task. Returns `WorkflowExecutionAlreadyStarted`, if an
 *  instance already exists with same workflow id.
 */
export async function startWorkflowExecution(
  {
    namespace,
    workflowId,
    body,
  }: {
    namespace: string;
    workflowId: string;
    body: components['schemas']['StartWorkflowExecutionRequest'];
  },
  { onError, baseUrl = window.location.origin }: RequestOptions = {},
): Promise<components['schemas']['StartWorkflowExecutionResponse']> {
  const url = new URL(`/api/v1/namespaces/${namespace}/workflows/${workflowId}`, baseUrl);

  return fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  }).then((response) => {
    if (!response.ok) {
      if (onError) return onError(response);
      throw new Error(`startWorkflowExecution request failed.`);
    }
    return response.json();
  });
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
export async function signalWithStartWorkflowExecution(
  {
    namespace,
    workflowId,
    signalName,
    body,
  }: {
    namespace: string;
    workflowId: string;
    signalName: string;
    body: components['schemas']['SignalWithStartWorkflowExecutionRequest'];
  },
  { onError, baseUrl = window.location.origin }: RequestOptions = {},
): Promise<components['schemas']['SignalWithStartWorkflowExecutionResponse']> {
  const url = new URL(
    `/api/v1/namespaces/${namespace}/workflows/${workflowId}/signal-with-start/${signalName}`,
    baseUrl,
  );

  return fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  }).then((response) => {
    if (!response.ok) {
      if (onError) return onError(response);
      throw new Error(`signalWithStartWorkflowExecution request failed.`);
    }
    return response.json();
  });
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
export async function executeMultiOperation(
  {
    namespace,
    body,
  }: { namespace: string; body: components['schemas']['ExecuteMultiOperationRequest'] },
  { onError, baseUrl = window.location.origin }: RequestOptions = {},
): Promise<components['schemas']['ExecuteMultiOperationResponse']> {
  const url = new URL(`/api/v1/namespaces/${namespace}/workflows/execute-multi-operation`, baseUrl);

  return fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  }).then((response) => {
    if (!response.ok) {
      if (onError) return onError(response);
      throw new Error(`executeMultiOperation request failed.`);
    }
    return response.json();
  });
}

/**
 * @description List all Nexus endpoints for the cluster, sorted by ID in ascending order. Set page_token in the request to the
 *  next_page_token field of the previous response to get the next page of results. An empty next_page_token
 *  indicates that there are no more results. During pagination, a newly added service with an ID lexicographically
 *  earlier than the previous page's last endpoint's ID may be missed.
 */
export async function listNexusEndpoints(
  { pageSize, nextPageToken, name }: { pageSize?: number; nextPageToken?: string; name?: string },
  { onError, baseUrl = window.location.origin }: RequestOptions = {},
): Promise<components['schemas']['ListNexusEndpointsResponse']> {
  const url = new URL(`/api/v1/nexus/endpoints`, baseUrl);

  if (pageSize) url.searchParams.append('pageSize', String(pageSize));

  if (nextPageToken) url.searchParams.append('nextPageToken', String(nextPageToken));

  if (name) url.searchParams.append('name', String(name));

  return fetch(url, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  }).then((response) => {
    if (!response.ok) {
      if (onError) return onError(response);
      throw new Error(`listNexusEndpoints request failed.`);
    }
    return response.json();
  });
}

/**
 * @description Create a Nexus endpoint. This will fail if an endpoint with the same name is already registered with a status of
 *  ALREADY_EXISTS.
 *  Returns the created endpoint with its initial version. You may use this version for subsequent updates.
 */
export async function createNexusEndpoint(
  { body }: { body: components['schemas']['CreateNexusEndpointRequest'] },
  { onError, baseUrl = window.location.origin }: RequestOptions = {},
): Promise<components['schemas']['CreateNexusEndpointResponse']> {
  const url = new URL(`/api/v1/nexus/endpoints`, baseUrl);

  return fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  }).then((response) => {
    if (!response.ok) {
      if (onError) return onError(response);
      throw new Error(`createNexusEndpoint request failed.`);
    }
    return response.json();
  });
}

/** @description Get a registered Nexus endpoint by ID. The returned version can be used for optimistic updates. */
export async function getNexusEndpoint(
  { id }: { id: string },
  { onError, baseUrl = window.location.origin }: RequestOptions = {},
): Promise<components['schemas']['GetNexusEndpointResponse']> {
  const url = new URL(`/api/v1/nexus/endpoints/${id}`, baseUrl);

  return fetch(url, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  }).then((response) => {
    if (!response.ok) {
      if (onError) return onError(response);
      throw new Error(`getNexusEndpoint request failed.`);
    }
    return response.json();
  });
}

/** @description Delete an incoming Nexus service by ID. */
export async function deleteNexusEndpoint(
  { version, id }: { id: string; version?: string },
  { onError, baseUrl = window.location.origin }: RequestOptions = {},
): Promise<components['schemas']['DeleteNexusEndpointResponse']> {
  const url = new URL(`/api/v1/nexus/endpoints/${id}`, baseUrl);

  if (version) url.searchParams.append('version', String(version));

  return fetch(url, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  }).then((response) => {
    if (!response.ok) {
      if (onError) return onError(response);
      throw new Error(`deleteNexusEndpoint request failed.`);
    }
    return response.json();
  });
}

/**
 * @description Optimistically update a Nexus endpoint based on provided version as obtained via the `GetNexusEndpoint` or
 *  `ListNexusEndpointResponse` APIs. This will fail with a status of FAILED_PRECONDITION if the version does not
 *  match.
 *  Returns the updated endpoint with its updated version. You may use this version for subsequent updates. You don't
 *  need to increment the version yourself. The server will increment the version for you after each update.
 */
export async function updateNexusEndpoint(
  { id, body }: { id: string; body: components['schemas']['UpdateNexusEndpointRequest'] },
  { onError, baseUrl = window.location.origin }: RequestOptions = {},
): Promise<components['schemas']['UpdateNexusEndpointResponse']> {
  const url = new URL(`/api/v1/nexus/endpoints/${id}/update`, baseUrl);

  return fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  }).then((response) => {
    if (!response.ok) {
      if (onError) return onError(response);
      throw new Error(`updateNexusEndpoint request failed.`);
    }
    return response.json();
  });
}

/** @description GetSystemInfo returns information about the system. */
export async function getSystemInfo({
  onError,
  baseUrl = window.location.origin,
}: RequestOptions = {}): Promise<components['schemas']['GetSystemInfoResponse']> {
  const url = new URL(`/api/v1/system-info`, baseUrl);

  return fetch(url, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  }).then((response) => {
    if (!response.ok) {
      if (onError) return onError(response);
      throw new Error(`getSystemInfo request failed.`);
    }
    return response.json();
  });
}

import type { components } from './schema.js';

type RequestOptions = {
  onError?: (response: Response) => void;
  baseUrl?: string;
};

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

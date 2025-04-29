{{- define "app.name" -}}
{{- $suffix := index . 0 -}}
{{- $scope := index . 1 -}}
{{- printf "%s-%s" $scope.Chart.Name $suffix | trunc 63 | trimSuffix "-" -}}
{{- end -}}


{{- define "app.instance" -}}
{{- $suffix := index . 0 -}}
{{- $scope := index . 1 -}}
{{- printf "%s-%s" $scope.Release.Name $suffix | trunc 63 | trimSuffix "-" -}}
{{- end -}}


{{- define "app.chart" -}}
{{- printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" | trunc 63 | trimSuffix "-" -}}
{{- end -}}


{{- define "app.selectorLabels" -}}
{{- $suffix := index . 0 -}}
{{- $scope := index . 1 -}}
app.kubernetes.io/name: {{ tuple $suffix $scope | include "app.name" }}
app.kubernetes.io/instance: {{ tuple $suffix $scope | include "app.instance" }}
{{- end -}}


{{- define "app.labels" -}}
{{- $suffix := index . 0 -}}
{{- $scope := index . 1 -}}
app/build: "{{ $scope.Values.gitlab.build }}"
helm.sh/chart: {{ template "app.chart" $scope }}
{{ tuple $suffix $scope | include "app.selectorLabels" }}
{{- if $scope.Chart.AppVersion }}
app.kubernetes.io/version: {{ $scope.Chart.AppVersion | quote }}
{{- end }}
app.kubernetes.io/managed-by: {{ $scope.Release.Service }}
{{- end -}}


{{- define "app.imagePullSecret" -}}
{{- printf "{\"auths\": {\"%s\": {\"auth\": \"%s\"}}}" .Values.imageCredentials.registry (printf "%s:%s" .Values.imageCredentials.username .Values.imageCredentials.password | b64enc) | b64enc }}
{{- end -}}


{{- define "app.env" -}}
{{- $env_exclude := list -}}
{{- if $env_exclude }}
{{ tuple . ".env" ($env_exclude | join ",") | include "env.parseFile" }}
{{- else }}
{{ tuple . ".env" | include "env.parseFile" }}
{{- end -}}
{{- end -}}


{{- define "env.parseFile" -}}
{{- $scope := index . 0 -}}
{{- $filePath := index . 1 -}}
{{- $exclude := list -}}
{{- if gt (len .) 2 -}}
{{- $exclude = splitList "," (index . 2) -}}
{{- end -}}
{{- range $scope.Files.Lines $filePath -}}
{{- $a := splitn "=" 2 . -}}
{{- if and $a._0 (not (has $a._0 $exclude)) -}}
- name: {{ $a._0 }}
  value: {{ $a._1 }}
{{ end -}}
{{- end -}}
{{- end -}}


{{- define "env.value" -}}
{{- $v := index . 0 -}}
{{- $ := index . 1 }}
{{- pluck $.Values.werf.env $v | first | default $v._default -}}
{{- end -}}


{{- define "env.yaml" -}}
{{- $scope := index . 0 -}}
{{- $ := index . 1 }}
{{- pluck $.Values.werf.env $scope | first | default $scope._default | toYaml -}}
{{- end -}}

{{/* common labels */}}
{{- define "common.labels" -}}
app: galaxy
tier: frontend
{{- end }}

{{/* common labels svc */}}
{{- define "common.labels.svc" -}}
app: galaxy
{{- end }}

{{/* common labels mysql */}}
{{- define "common.labels.mysql" -}}
app: wordpress
tier: mysql
{{- end }}
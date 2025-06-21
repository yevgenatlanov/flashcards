import {
  Box,
  Stack,
  Button,
  Tooltip,
  TableRow,
  Checkbox,
  TableCell,
  IconButton,
  Typography,
  Avatar,
  Chip,
} from "@mui/material";
import { useState } from "react";
import { fDateTime } from "src/utils/format-time";
import { fNumber } from "src/utils/format-number";
import { Label } from "src/components/label";
import { Iconify } from "src/components/iconify";
import { ConfirmDialog } from "src/components/custom-dialog";
import {
  Membership,
  MembershipStatus,
  MembershipTier,
  MembershipSource,
} from "src/types/membership";

type Props = {
  row: Membership;
  selected: boolean;
  onEditRow: () => void;
  onViewRow: () => void;
  onSelectRow: () => void;
  onDeleteRow: () => void;
};

export function MembershipTableRow({
  row,
  selected,
  onEditRow,
  onViewRow,
  onSelectRow,
  onDeleteRow,
}: Props) {
  const [openConfirm, setOpenConfirm] = useState(false);

  const isActive = row.status === MembershipStatus.ACTIVE;
  const isExpired = row.status === MembershipStatus.EXPIRED;
  const isCancelled = row.status === MembershipStatus.CANCELLED;
  const isPending = row.status === MembershipStatus.PENDING;

  const isExpiringSoon =
    isActive &&
    row.expiryDate &&
    new Date(row.expiryDate) < new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleConfirmDelete = () => {
    onDeleteRow();
    handleCloseConfirm();
  };

  const getStatusColor = () => {
    if (isActive) return "success";
    if (isExpired) return "warning";
    if (isCancelled) return "error";
    if (isPending) return "info";
    return "default";
  };

  const getTierColor = () => {
    switch (row.tier) {
      case MembershipTier.DIAMOND:
        return "primary";
      case MembershipTier.PLATINUM:
        return "secondary";
      case MembershipTier.SILVER:
        return "info";
      case MembershipTier.BRONZE:
        return "warning";
      default:
        return "default";
    }
  };

  const getTierIcon = () => {
    switch (row.tier) {
      case MembershipTier.DIAMOND:
        return "material-symbols:diamond";
      case MembershipTier.PLATINUM:
        return "material-symbols:workspace-premium";
      case MembershipTier.SILVER:
        return "material-symbols:star";
      case MembershipTier.BRONZE:
        return "material-symbols:shield";
      default:
        return "material-symbols:person";
    }
  };

  const getSourceIcon = () => {
    switch (row.source) {
      case MembershipSource.TOKEN:
        return "material-symbols:token";
      case MembershipSource.PAYMENT:
        return "material-symbols:credit-card";
      case MembershipSource.EXP:
        return "material-symbols:trending-up";
      case MembershipSource.HYBRID:
        return "material-symbols:merge";
      default:
        return "material-symbols:help";
    }
  };

  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox checked={selected} onClick={onSelectRow} />
        </TableCell>

        <TableCell>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar src={row.member.avatar} alt={row.member.name} />
            <Box>
              <Typography variant="subtitle2">{row.member.name}</Typography>
              <Typography variant="caption" color="text.secondary">
                {row.member.email}
              </Typography>
            </Box>
          </Stack>
        </TableCell>

        <TableCell>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Iconify icon={getTierIcon()} width={20} />
            <Label variant="soft" color={getTierColor()}>
              {row.tier.toUpperCase()}
            </Label>
          </Stack>
        </TableCell>

        <TableCell>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Iconify icon={getSourceIcon()} width={16} />
            <Typography variant="body2" sx={{ textTransform: "capitalize" }}>
              {row.source}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell>
          {row.tokenStakeAmount > 0 ? (
            <Stack direction="row" alignItems="center" spacing={1}>
              <Iconify
                icon="material-symbols:token"
                width={16}
                color="warning.main"
              />
              <Typography variant="body2" fontWeight="medium">
                {fNumber(row.tokenStakeAmount)}
              </Typography>
            </Stack>
          ) : (
            <Typography variant="body2" color="text.disabled">
              -
            </Typography>
          )}
        </TableCell>

        <TableCell>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Iconify
              icon="material-symbols:trending-up"
              width={16}
              color="info.main"
            />
            <Typography variant="body2">{fNumber(row.expAmount)}</Typography>
          </Stack>
        </TableCell>

        <TableCell>
          <Typography variant="body2" fontWeight="medium" color="primary.main">
            {fNumber(row.votingPower)}
          </Typography>
        </TableCell>

        <TableCell>
          <Stack spacing={0.5}>
            {row.hubAccess.slice(0, 2).map((hub) => (
              <Chip
                key={hub}
                label={hub}
                size="small"
                variant="outlined"
                sx={{ fontSize: "0.75rem" }}
              />
            ))}
            {row.hubAccess.length > 2 && (
              <Typography variant="caption" color="text.secondary">
                +{row.hubAccess.length - 2} more
              </Typography>
            )}
          </Stack>
        </TableCell>

        <TableCell>
          <Label variant="soft" color={getStatusColor()}>
            {row.status}
          </Label>
        </TableCell>

        <TableCell>
          {row.expiryDate ? (
            <Typography
              variant="body2"
              sx={{
                color:
                  isExpiringSoon && isActive ? "warning.main" : "text.primary",
                fontWeight: isExpiringSoon && isActive ? "medium" : "regular",
              }}
            >
              {fDateTime(row.expiryDate)}
            </Typography>
          ) : (
            <Stack direction="row" alignItems="center" spacing={1}>
              <Iconify icon="material-symbols:all-inclusive" width={16} />
              <Typography
                variant="body2"
                color="success.main"
                fontWeight="medium"
              >
                Lifetime
              </Typography>
            </Stack>
          )}
        </TableCell>

        <TableCell>
          <Stack direction="row" alignItems="center">
            <Tooltip title="View Member" placement="top" arrow>
              <IconButton onClick={onViewRow}>
                <Iconify icon="solar:eye-bold" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Edit Membership" placement="top" arrow>
              <IconButton onClick={onEditRow}>
                <Iconify icon="solar:pen-bold" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete Membership" placement="top" arrow>
              <IconButton color="error" onClick={handleOpenConfirm}>
                <Iconify icon="solar:trash-bin-trash-bold" />
              </IconButton>
            </Tooltip>
          </Stack>
        </TableCell>
      </TableRow>

      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title="Delete Membership"
        content={`Are you sure you want to delete ${row.member.name}'s membership?`}
        action={
          <Button
            variant="contained"
            color="error"
            onClick={handleConfirmDelete}
          >
            Delete
          </Button>
        }
      />
    </>
  );
}
